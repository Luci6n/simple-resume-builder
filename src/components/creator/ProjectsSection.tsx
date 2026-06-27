import type { ResumeData } from "../../types/common";
import type { ResumeEditorActions } from "../../hooks/useResumeEditor";
import { createEmptyProject } from "../../utils/resumeEditor";
import { BulletListEditor, SectionDeleteButton, TextInput } from "./FormControls";

type ProjectsSectionProps = {
  actions: ResumeEditorActions;
  projects: ResumeData["projects"];
};

export function ProjectsSection({ actions, projects }: ProjectsSectionProps) {
  return (
    <div className="pb-5">
      <h1 className="section-header">Projects</h1>
      {projects.map((project, index) => (
        <div key={index} className="projects flex flex-col gap-3 pb-3">
          <TextInput
            label="Project Title"
            value={project.projectName}
            onChange={(value) => actions.updateArrayItem("projects", index, { projectName: value })}
          />
          <BulletListEditor
            label="Description"
            items={project.description}
            onChange={(descriptionIndex, value) =>
              actions.updateNestedArrayItem(
                "projects",
                index,
                "description",
                descriptionIndex,
                value,
              )
            }
            onAdd={() => actions.addNestedArrayItem("projects", index, "description", "")}
            onDelete={(descriptionIndex) =>
              actions.deleteNestedArrayItem("projects", index, "description", descriptionIndex)
            }
          />
          <SectionDeleteButton onClick={() => actions.deleteArrayItem("projects", index)}>
            Delete Project?
          </SectionDeleteButton>
        </div>
      ))}
      <button
        type="button"
        className="creator-page-button mt-0"
        onClick={() => actions.addArrayItem("projects", createEmptyProject())}
      >
        Add Project
      </button>
    </div>
  );
}
