import type {
  BuiltInSectionId,
  ResumeCustomSection,
  ResumeData,
  ResumeSectionId,
} from "../types/common";

export const defaultSectionOrder: BuiltInSectionId[] = [
  "summary",
  "experience",
  "education",
  "projects",
  "skills",
  "awardsCertification",
  "extracurricularActivities",
  "languages",
];

const isBuiltInSection = (sectionId: ResumeSectionId): sectionId is BuiltInSectionId =>
  defaultSectionOrder.includes(sectionId as BuiltInSectionId);

const createCustomSectionId = (sections: ResumeCustomSection[]): `custom-${string}` => {
  const nextNumber = sections.length + 1;
  let candidate = `custom-${nextNumber}` as `custom-${string}`;
  let suffix = nextNumber;

  while (sections.some((section) => section.id === candidate)) {
    suffix += 1;
    candidate = `custom-${suffix}` as `custom-${string}`;
  }

  return candidate;
};

export const normalizeResumeData = (data: ResumeData): ResumeData => {
  const customSections = data.customSections ?? [];
  const customIds = customSections.map((section) => section.id);
  const currentOrder = data.sectionOrder ?? defaultSectionOrder;
  const cleanedCurrentOrder = currentOrder.filter(
    (sectionId) => isBuiltInSection(sectionId) || customIds.includes(sectionId as `custom-${string}`),
  );
  const missingBuiltIns = defaultSectionOrder.filter(
    (sectionId) => !cleanedCurrentOrder.includes(sectionId),
  );
  const missingCustomIds = customIds.filter((sectionId) => !cleanedCurrentOrder.includes(sectionId));

  return {
    ...data,
    sectionOrder: [...cleanedCurrentOrder, ...missingBuiltIns, ...missingCustomIds],
    customSections,
  };
};

export const moveSection = (
  data: ResumeData,
  sectionId: ResumeSectionId,
  offset: number,
): ResumeData => {
  const normalized = normalizeResumeData(data);
  const sectionOrder = normalized.sectionOrder ?? defaultSectionOrder;
  const fromIndex = sectionOrder.indexOf(sectionId);
  const toIndex = fromIndex + offset;

  if (fromIndex < 0 || toIndex < 0 || toIndex >= sectionOrder.length) {
    return normalized;
  }

  const nextOrder = [...sectionOrder];
  const [section] = nextOrder.splice(fromIndex, 1);
  nextOrder.splice(toIndex, 0, section);

  return {
    ...normalized,
    sectionOrder: nextOrder,
  };
};

export const reorderSections = (
  data: ResumeData,
  fromSectionId: ResumeSectionId,
  toSectionId: ResumeSectionId,
): ResumeData => {
  const normalized = normalizeResumeData(data);
  const sectionOrder = normalized.sectionOrder ?? defaultSectionOrder;
  const fromIndex = sectionOrder.indexOf(fromSectionId);
  const toIndex = sectionOrder.indexOf(toSectionId);

  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
    return normalized;
  }

  const nextOrder = [...sectionOrder];
  const [section] = nextOrder.splice(fromIndex, 1);
  nextOrder.splice(toIndex, 0, section);

  return {
    ...normalized,
    sectionOrder: nextOrder,
  };
};

export const addCustomSection = (data: ResumeData): ResumeData => {
  const normalized = normalizeResumeData(data);
  const customSections = normalized.customSections ?? [];
  const newSection: ResumeCustomSection = {
    id: createCustomSectionId(customSections),
    title: "Custom Section",
    items: [""],
  };

  return {
    ...normalized,
    sectionOrder: [...(normalized.sectionOrder ?? defaultSectionOrder), newSection.id],
    customSections: [...customSections, newSection],
  };
};

export const updateCustomSection = (
  data: ResumeData,
  sectionId: `custom-${string}`,
  patch: Partial<Omit<ResumeCustomSection, "id">>,
): ResumeData => {
  const normalized = normalizeResumeData(data);

  return {
    ...normalized,
    customSections: (normalized.customSections ?? []).map((section) =>
      section.id === sectionId ? { ...section, ...patch } : section,
    ),
  };
};

export const deleteCustomSection = (
  data: ResumeData,
  sectionId: `custom-${string}`,
): ResumeData => {
  const normalized = normalizeResumeData(data);

  return {
    ...normalized,
    sectionOrder: (normalized.sectionOrder ?? defaultSectionOrder).filter((id) => id !== sectionId),
    customSections: (normalized.customSections ?? []).filter((section) => section.id !== sectionId),
  };
};

export const getSectionLabel = (sectionId: ResumeSectionId, data: ResumeData): string => {
  const customSection = data.customSections?.find((section) => section.id === sectionId);

  if (customSection) return customSection.title || "Custom Section";

  const labels: Record<BuiltInSectionId, string> = {
    summary: "Summary",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    skills: "Technical Skills",
    awardsCertification: "Awards & Certifications",
    extracurricularActivities: "Extracurricular Activities",
    languages: "Languages",
  };

  return labels[sectionId as BuiltInSectionId] ?? "Custom Section";
};
