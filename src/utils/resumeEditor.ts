import type { ArraySection, ResumeData } from "../types/common";

export type ResumeArraySection = ArraySection | "extracurricularActivities";
export type NestedArraySection = "experience" | "projects" | "skills";
export type DateDurationSection = "experience" | "education";
export type DateDurationKey = "startDate" | "endDate" | "isCurrent";

export type SectionItems<Section extends ResumeArraySection> = NonNullable<ResumeData[Section]>;
export type SectionItem<Section extends ResumeArraySection> = SectionItems<Section>[number];
export type NestedField<Section extends NestedArraySection> = Section extends "skills"
  ? "skillName"
  : "description";
export type DateDurationField<Section extends DateDurationSection> = Section extends "experience"
  ? "employmentDuration"
  : "graduationDate";
export type DateDurationValue<Key extends DateDurationKey> = Key extends "isCurrent"
  ? boolean
  : string;

const getSectionItems = <Section extends ResumeArraySection>(
  data: ResumeData,
  section: Section,
): SectionItems<Section> => (data[section] ?? []) as SectionItems<Section>;

const setSectionItems = <Section extends ResumeArraySection>(
  data: ResumeData,
  section: Section,
  items: SectionItems<Section>,
): ResumeData => ({
  ...data,
  [section]: items,
});

export const updateHeaderField = (
  data: ResumeData,
  field: keyof ResumeData["header"],
  value: string,
): ResumeData => ({
  ...data,
  header: {
    ...data.header,
    [field]: value,
  },
});

export const updateSummary = (data: ResumeData, summary: string): ResumeData => ({
  ...data,
  summary,
});

export const updateArrayItem = <Section extends ResumeArraySection>(
  data: ResumeData,
  section: Section,
  index: number,
  patch: Partial<SectionItem<Section>>,
): ResumeData => {
  const items = getSectionItems(data, section);
  const nextItems = items.map((item, itemIndex) =>
    itemIndex === index ? { ...item, ...patch } : item,
  ) as SectionItems<Section>;

  return setSectionItems(data, section, nextItems);
};

export const addArrayItem = <Section extends ResumeArraySection>(
  data: ResumeData,
  section: Section,
  newItem: SectionItem<Section>,
): ResumeData => {
  const items = getSectionItems(data, section);

  return setSectionItems(data, section, [...items, newItem] as SectionItems<Section>);
};

export const deleteArrayItem = <Section extends ResumeArraySection>(
  data: ResumeData,
  section: Section,
  index: number,
): ResumeData => {
  const items = getSectionItems(data, section);

  return setSectionItems(
    data,
    section,
    items.filter((_, itemIndex) => itemIndex !== index) as SectionItems<Section>,
  );
};

export const updateNestedArrayItem = <Section extends NestedArraySection>(
  data: ResumeData,
  section: Section,
  itemIndex: number,
  field: NestedField<Section>,
  valueIndex: number,
  value: string,
): ResumeData => {
  const item = getSectionItems(data, section)[itemIndex];
  const currentValues = item[field as keyof typeof item] as string[];

  return updateArrayItem(data, section, itemIndex, {
    [field]: currentValues.map((currentValue, currentIndex) =>
      currentIndex === valueIndex ? value : currentValue,
    ),
  } as Partial<SectionItem<Section>>);
};

export const addNestedArrayItem = <Section extends NestedArraySection>(
  data: ResumeData,
  section: Section,
  itemIndex: number,
  field: NestedField<Section>,
  newItem: string,
): ResumeData => {
  const item = getSectionItems(data, section)[itemIndex];
  const currentValues = item[field as keyof typeof item] as string[];

  return updateArrayItem(data, section, itemIndex, {
    [field]: [...currentValues, newItem],
  } as Partial<SectionItem<Section>>);
};

export const deleteNestedArrayItem = <Section extends NestedArraySection>(
  data: ResumeData,
  section: Section,
  itemIndex: number,
  field: NestedField<Section>,
  valueIndex: number,
): ResumeData => {
  const item = getSectionItems(data, section)[itemIndex];
  const currentValues = item[field as keyof typeof item] as string[];

  return updateArrayItem(data, section, itemIndex, {
    [field]: currentValues.filter((_, currentIndex) => currentIndex !== valueIndex),
  } as Partial<SectionItem<Section>>);
};

export const updateDateDuration = <
  Section extends DateDurationSection,
  Field extends DateDurationField<Section>,
  Key extends DateDurationKey,
>(
  data: ResumeData,
  section: Section,
  index: number,
  field: Field,
  dateField: Key,
  value: DateDurationValue<Key>,
): ResumeData => {
  const item = getSectionItems(data, section)[index];
  const currentDuration = item[field as keyof typeof item] as ResumeData["experience"][number]["employmentDuration"];

  return updateArrayItem(data, section, index, {
    [field]: {
      ...currentDuration,
      [dateField]: value,
    },
  } as Partial<SectionItem<Section>>);
};

export const createEmptyExperience = (): ResumeData["experience"][number] => ({
  companyName: "",
  companyLocation: "",
  positionTitle: "",
  employmentDuration: {
    startDate: "",
    endDate: "",
    isCurrent: false,
  },
  description: [],
});

export const createEmptyEducation = (): ResumeData["education"][number] => ({
  institutionName: "",
  location: "",
  courseOfStudy: "",
  cgpa: 0,
  graduationDate: {
    startDate: "",
    endDate: "",
    isCurrent: false,
  },
});

export const createEmptyProject = (): ResumeData["projects"][number] => ({
  projectName: "",
  description: [],
});

export const createEmptySkill = (): ResumeData["skills"][number] => ({
  skillCategory: "",
  skillName: [],
});

export const createEmptyAwardCertification = (): ResumeData["awardsCertification"][number] => ({
  awardCertificationTitle: "",
});

export const createEmptyExtracurricularActivity = (): NonNullable<
  ResumeData["extracurricularActivities"]
>[number] => ({
  activityName: "",
});

export const createEmptyLanguage = (): ResumeData["languages"][number] => ({
  languageName: "",
  proficiencyLevel: "",
});
