import type { ResumeData, ResumeSectionId } from "../types/common";
import type { PreviewProps } from "../types/common";
import { defaultSectionOrder, normalizeResumeData } from "../utils/sectionLayout";

const formatMonthYear = (value: string) => {
  if (!value) return "";

  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1);

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const renderSection = (sectionId: ResumeSectionId, inputData: ResumeData) => {
  if (sectionId.startsWith("custom-")) {
    const customSection = inputData.customSections?.find((section) => section.id === sectionId);

    if (!customSection) return null;

    return (
      <div key={sectionId} className="custom-section flex flex-col">
        <h1 className="text-base font-bold border-b uppercase">{customSection.title}</h1>
        <ul className="list-disc list-outside pl-5">
          {customSection.items.map((item, index) => (
            <li key={index} className="text-[15px]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  switch (sectionId) {
    case "summary":
      return (
        <div key={sectionId} className="flex flex-col">
          <h1 className="text-base font-bold border-b uppercase">Summary</h1>
          <p className="text-[15px] text-justify">{inputData.summary}</p>
        </div>
      );
    case "experience":
      return (
        <div key={sectionId} className="experience flex flex-col">
          <h1 className="text-base font-bold border-b uppercase">Experience</h1>
          {inputData.experience.map((experience, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <span className="font-bold text-[15px]">{experience.companyName}</span>
                <span className="text-[15px]">{experience.companyLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[15px]">{experience.positionTitle}</span>
                <span className="text-[15px]">
                  {formatMonthYear(experience.employmentDuration.startDate) + " - "}{" "}
                  {experience.employmentDuration.isCurrent
                    ? "Present"
                    : formatMonthYear(experience.employmentDuration.endDate)}
                </span>
              </div>
              <ul className="list-disc list-outside pl-5">
                {experience.description.map((description, descIndex) => (
                  <li key={descIndex} className="text-[15px]">
                    {description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "education":
      return (
        <div key={sectionId} className="education flex flex-col">
          <h1 className="text-base font-bold border-b uppercase">Education</h1>
          {inputData.education.map((education, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <span className="font-bold text-[15px]">{education.institutionName}</span>
              </div>
              <div className="flex justify-between ">
                <div className="flex gap-1">
                  <span className="text-[15px]">{education.courseOfStudy};</span>
                  <span className="font-bold text-[15px]">CGPA:{education.cgpa}</span>
                </div>
                <span className="text-[15px]">
                  {formatMonthYear(education.graduationDate.startDate) + " - "}{" "}
                  {education.graduationDate.isCurrent
                    ? "Present"
                    : formatMonthYear(education.graduationDate.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    case "projects":
      return (
        <div key={sectionId} className="projects flex flex-col">
          <h1 className="text-base font-bold border-b uppercase">Projects</h1>
          {inputData.projects.map((project, index) => (
            <div key={index}>
              <span className="font-bold text-[15px]">{project.projectName}</span>
              <ul className="list-disc list-outside pl-5">
                {project.description.map((description, descIndex) => (
                  <li key={descIndex} className="text-[15px]">
                    {description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "skills":
      return (
        <div key={sectionId} className="skills flex flex-col">
          <h1 className="text-base font-bold border-b uppercase">Technical Skills</h1>
          {inputData.skills.map((skill, index) => (
            <div key={index} className="flex gap-1">
              <span className="font-bold text-[15px]">{skill.skillCategory}:</span>
              <span className="text-[15px]">{skill.skillName.join(", ")}</span>
            </div>
          ))}
        </div>
      );
    case "awardsCertification":
      return (
        <div key={sectionId} className="awards flex flex-col">
          <h1 className="text-base font-bold border-b uppercase">Awards & Certifications</h1>
          <ul className="list-disc list-outside pl-5">
            {inputData.awardsCertification.map((award, index) => (
              <li key={index} className="text-[15px]">
                {award.awardCertificationTitle}
              </li>
            ))}
          </ul>
        </div>
      );
    case "extracurricularActivities":
      return (
        <div key={sectionId} className="extracurricular flex flex-col">
          <h1 className="text-base font-bold border-b uppercase">
            Extracurricular Activities (optional)
          </h1>
          <ul className="list-disc list-outside pl-5">
            {inputData.extracurricularActivities?.map((activity, index) => (
              <li key={index} className="text-[15px]">
                {activity.activityName}
              </li>
            ))}
          </ul>
        </div>
      );
    case "languages":
      return (
        <div key={sectionId} className="languages flex flex-col">
          <h1 className="text-base font-bold border-b uppercase">Languages</h1>
          {inputData.languages.map((language, index) => (
            <div key={index} className="flex gap-1">
              <span className="font-bold text-[15px]">{language.languageName}:</span>
              <span className="text-[15px]">{language.proficiencyLevel}</span>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default function Preview({ inputData }: PreviewProps) {
  const normalizedData = normalizeResumeData(inputData);
  const sectionOrder = normalizedData.sectionOrder ?? defaultSectionOrder;

  return (
    <>
      <h1 className="section-header">Resume Preview</h1>
      <div className="resume-page">
        <div className="flex flex-col">
          <span className="form-label-text text-center text-[19px]">
            {normalizedData.header.name}
          </span>
          <div className="flex flex-row divide-x justify-center">
            <span className="pr-1 text-[15px]">{normalizedData.header.email}</span>
            <span className="px-1 text-[15px]">{normalizedData.header.phoneNumber}</span>
            <span className="px-1 text-[15px]">{normalizedData.header.location}</span>
            <span className="pl-1 text-[15px]">{normalizedData.header.linkedin ?? undefined}</span>
          </div>
        </div>
        {sectionOrder.map((sectionId) => renderSection(sectionId, normalizedData))}
      </div>
    </>
  );
}
