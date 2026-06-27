import type { ResumeData } from "../../types/common";
import type { ResumeEditorActions } from "../../hooks/useResumeEditor";
import { createEmptyExperience } from "../../utils/resumeEditor";
import {
  BulletListEditor,
  CheckboxInput,
  SectionDeleteButton,
  TextInput,
} from "./FormControls";

type ExperienceSectionProps = {
  actions: ResumeEditorActions;
  experience: ResumeData["experience"];
};

export function ExperienceSection({ actions, experience }: ExperienceSectionProps) {
  return (
    <div className="pb-5">
      <h1 className="section-header">Experience</h1>
      {experience.map((experienceItem, index) => (
        <div key={index} className="experience flex flex-col gap-3 pb-3">
          <TextInput
            label="Company Name"
            value={experienceItem.companyName}
            placeholder="e.g. Apple Inc."
            onChange={(value) => actions.updateArrayItem("experience", index, { companyName: value })}
          />
          <TextInput
            label="Company Location"
            name="location"
            value={experienceItem.companyLocation}
            autoComplete="on"
            placeholder="e.g. Klang, Selangor"
            onChange={(value) =>
              actions.updateArrayItem("experience", index, { companyLocation: value })
            }
          />
          <TextInput
            label="Position Title"
            value={experienceItem.positionTitle}
            placeholder="e.g. Software Developer"
            onChange={(value) =>
              actions.updateArrayItem("experience", index, { positionTitle: value })
            }
          />
          <TextInput
            label="Start Date"
            type="month"
            value={experienceItem.employmentDuration.startDate}
            onChange={(value) =>
              actions.updateDateDuration(
                "experience",
                index,
                "employmentDuration",
                "startDate",
                value,
              )
            }
          />
          <TextInput
            label="End Date"
            type="month"
            value={experienceItem.employmentDuration.endDate}
            onChange={(value) =>
              actions.updateDateDuration(
                "experience",
                index,
                "employmentDuration",
                "endDate",
                value,
              )
            }
          />
          <CheckboxInput
            label="Currently work here?"
            checked={experienceItem.employmentDuration.isCurrent}
            onChange={(checked) =>
              actions.updateDateDuration(
                "experience",
                index,
                "employmentDuration",
                "isCurrent",
                checked,
              )
            }
          />
          <BulletListEditor
            label="Description"
            items={experienceItem.description}
            addButtonClassName="creator-page-button"
            onChange={(descriptionIndex, value) =>
              actions.updateNestedArrayItem(
                "experience",
                index,
                "description",
                descriptionIndex,
                value,
              )
            }
            onAdd={() => actions.addNestedArrayItem("experience", index, "description", "")}
            onDelete={(descriptionIndex) =>
              actions.deleteNestedArrayItem("experience", index, "description", descriptionIndex)
            }
          />
          <SectionDeleteButton onClick={() => actions.deleteArrayItem("experience", index)}>
            Delete Experience?
          </SectionDeleteButton>
        </div>
      ))}
      <button
        type="button"
        className="creator-page-button mt-0"
        onClick={() => actions.addArrayItem("experience", createEmptyExperience())}
      >
        Add Experience
      </button>
    </div>
  );
}
