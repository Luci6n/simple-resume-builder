import { ActivitiesSection } from "../components/creator/ActivitiesSection";
import { AwardsSection } from "../components/creator/AwardsSection";
import { EducationSection } from "../components/creator/EducationSection";
import { ExperienceSection } from "../components/creator/ExperienceSection";
import { HeaderSection } from "../components/creator/HeaderSection";
import { LanguagesSection } from "../components/creator/LanguagesSection";
import { ProjectsSection } from "../components/creator/ProjectsSection";
import { SectionManager } from "../components/creator/SectionManager";
import { SkillsSection } from "../components/creator/SkillsSection";
import { SummarySection } from "../components/creator/SummarySection";
import { useResumeEditor } from "../hooks/useResumeEditor";
import type { CreatorProps } from "../types/common";

export default function Creator({ inputData, setInputData }: CreatorProps) {
  const actions = useResumeEditor(setInputData);

  return (
    <div className="creator-scroll-fade relative">
      <div className="max-h-280 flex flex-col divide-y gap-5 px-15 py-10 font-mono overflow-auto border-y border-current/5">
        <HeaderSection header={inputData.header} actions={actions} />
        <SectionManager inputData={inputData} actions={actions} />
        <SummarySection summary={inputData.summary} actions={actions} />
        <ExperienceSection experience={inputData.experience} actions={actions} />
        <EducationSection education={inputData.education} actions={actions} />
        <ProjectsSection projects={inputData.projects} actions={actions} />
        <SkillsSection skills={inputData.skills} actions={actions} />
        <AwardsSection
          awardsCertification={inputData.awardsCertification}
          actions={actions}
        />
        <ActivitiesSection
          extracurricularActivities={inputData.extracurricularActivities}
          actions={actions}
        />
        <LanguagesSection languages={inputData.languages} actions={actions} />
      </div>
    </div>
  );
}
