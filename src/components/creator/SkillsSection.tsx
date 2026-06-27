import type { ResumeData } from "../../types/common";
import type { ResumeEditorActions } from "../../hooks/useResumeEditor";
import { createEmptySkill } from "../../utils/resumeEditor";
import { BulletListEditor, SectionDeleteButton, TextInput } from "./FormControls";

type SkillsSectionProps = {
  actions: ResumeEditorActions;
  skills: ResumeData["skills"];
};

export function SkillsSection({ actions, skills }: SkillsSectionProps) {
  return (
    <div className="pb-5">
      <h1 className="section-header">Technical Skills</h1>
      {skills.map((skill, index) => (
        <div key={index} className="skills flex flex-col gap-3 pb-3">
          <TextInput
            label="Skill Category"
            value={skill.skillCategory}
            placeholder="e.g. Programming Languages, Frameworks, Tools, etc."
            onChange={(value) => actions.updateArrayItem("skills", index, { skillCategory: value })}
          />
          <BulletListEditor
            label="Skill"
            items={skill.skillName}
            addButtonClassName="creator-page-button m-0"
            onChange={(skillIndex, value) =>
              actions.updateNestedArrayItem("skills", index, "skillName", skillIndex, value)
            }
            onAdd={() => actions.addNestedArrayItem("skills", index, "skillName", "")}
            onDelete={(skillIndex) =>
              actions.deleteNestedArrayItem("skills", index, "skillName", skillIndex)
            }
          />
          <SectionDeleteButton onClick={() => actions.deleteArrayItem("skills", index)}>
            Delete Skill Category?
          </SectionDeleteButton>
        </div>
      ))}
      <button
        type="button"
        className="creator-page-button mt-0"
        onClick={() => actions.addArrayItem("skills", createEmptySkill())}
      >
        Add Skill Category
      </button>
    </div>
  );
}
