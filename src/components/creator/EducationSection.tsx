import type { ResumeData } from "../../types/common";
import type { ResumeEditorActions } from "../../hooks/useResumeEditor";
import { createEmptyEducation } from "../../utils/resumeEditor";
import { CheckboxInput, SectionDeleteButton, TextInput } from "./FormControls";

type EducationSectionProps = {
  actions: ResumeEditorActions;
  education: ResumeData["education"];
};

export function EducationSection({ actions, education }: EducationSectionProps) {
  return (
    <div className="pb-5">
      <h1 className="section-header">Education</h1>
      {education.map((educationItem, index) => (
        <div key={index} className="education flex flex-col gap-3 pb-3">
          <TextInput
            label="Institution Name"
            value={educationItem.institutionName}
            placeholder="e.g. Universiti Tak Ada Rehat"
            onChange={(value) =>
              actions.updateArrayItem("education", index, { institutionName: value })
            }
          />
          <TextInput
            label="Location"
            name="location"
            value={educationItem.location}
            autoComplete="on"
            placeholder="e.g. Klang, Selangor"
            onChange={(value) => actions.updateArrayItem("education", index, { location: value })}
          />
          <TextInput
            label="Course of Study"
            value={educationItem.courseOfStudy}
            placeholder="e.g. Bachelor of Computer Science"
            onChange={(value) =>
              actions.updateArrayItem("education", index, { courseOfStudy: value })
            }
          />
          <TextInput
            label="CGPA"
            type="number"
            max="5"
            min="0"
            step="0.01"
            value={educationItem.cgpa}
            placeholder="0.00 - 5.00"
            onChange={(value) => actions.updateArrayItem("education", index, { cgpa: Number(value) })}
          />
          <TextInput
            label="Start Date"
            type="month"
            value={educationItem.graduationDate.startDate}
            onChange={(value) =>
              actions.updateDateDuration(
                "education",
                index,
                "graduationDate",
                "startDate",
                value,
              )
            }
          />
          {!educationItem.graduationDate.isCurrent ? (
            <TextInput
              label="End Date"
              type="month"
              value={educationItem.graduationDate.endDate}
              onChange={(value) =>
                actions.updateDateDuration(
                  "education",
                  index,
                  "graduationDate",
                  "endDate",
                  value,
                )
              }
            />
          ) : undefined}
          <CheckboxInput
            label="Currently study here?"
            checked={educationItem.graduationDate.isCurrent}
            onChange={(checked) =>
              actions.updateDateDuration(
                "education",
                index,
                "graduationDate",
                "isCurrent",
                checked,
              )
            }
          />
          <SectionDeleteButton onClick={() => actions.deleteArrayItem("education", index)}>
            Delete Education?
          </SectionDeleteButton>
        </div>
      ))}
      <button
        type="button"
        className="creator-page-button mt-0"
        onClick={() => actions.addArrayItem("education", createEmptyEducation())}
      >
        Add Education
      </button>
    </div>
  );
}
