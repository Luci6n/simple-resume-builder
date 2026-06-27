import { useState } from "react";
import type { ResumeData } from "../../types/common";
import type { ResumeEditorActions } from "../../hooks/useResumeEditor";
import {
  generateExperienceBullet,
  generateProjectBullet,
  generateResumeSummary,
  improveResumeLine,
} from "../../utils/contentAssist";
import { MagicWandIcon } from "@phosphor-icons/react/dist/csr/MagicWand";
import { SparkleIcon } from "@phosphor-icons/react/dist/csr/Sparkle";

type ContentAssistSectionProps = {
  actions: ResumeEditorActions;
  inputData: ResumeData;
};

export function ContentAssistSection({ actions, inputData }: ContentAssistSectionProps) {
  const [targetRole, setTargetRole] = useState("");
  const [draftLine, setDraftLine] = useState("");
  const role = targetRole.trim() || "target role";
  const firstExperience = inputData.experience[0];
  const firstProject = inputData.projects[0];

  return (
    <div className="pb-5">
      <h1 className="section-header">AI Assist</h1>
      <div className="flex flex-col gap-3 text-sm">
        <label className="form-label">
          <span className="form-label-text">Target role</span>
          <input
            className="form-input"
            type="text"
            value={targetRole}
            placeholder="e.g. frontend developer"
            onChange={(event) => setTargetRole(event.target.value)}
          />
        </label>
        <button
          type="button"
          className="creator-page-button mt-0 flex items-center justify-center gap-2"
          onClick={() => actions.updateSummary(generateResumeSummary(inputData, role))}
        >
          <SparkleIcon size={18} />
          <span>Generate Summary</span>
        </button>
        <button
          type="button"
          className="creator-page-button mt-0 flex items-center justify-center gap-2"
          disabled={!firstExperience}
          onClick={() =>
            actions.addNestedArrayItem(
              "experience",
              0,
              "description",
              generateExperienceBullet(firstExperience, role),
            )
          }
        >
          <MagicWandIcon size={18} />
          <span>Add Experience Bullet</span>
        </button>
        <button
          type="button"
          className="creator-page-button mt-0 flex items-center justify-center gap-2"
          disabled={!firstProject}
          onClick={() =>
            actions.addNestedArrayItem(
              "projects",
              0,
              "description",
              generateProjectBullet(firstProject, role),
            )
          }
        >
          <MagicWandIcon size={18} />
          <span>Add Project Bullet</span>
        </button>
        <label className="flex flex-col gap-2 text-soft-black dark:text-soft-milk">
          <span className="form-label-text">Improve a line</span>
          <textarea
            className="form-input min-h-20 resize-y"
            value={draftLine}
            placeholder="Paste a rough bullet or sentence."
            onChange={(event) => setDraftLine(event.target.value)}
          />
        </label>
        <button
          type="button"
          className="creator-page-button mt-0 flex items-center justify-center gap-2"
          onClick={() => setDraftLine(improveResumeLine(draftLine, role))}
        >
          <SparkleIcon size={18} />
          <span>Improve Draft Line</span>
        </button>
      </div>
    </div>
  );
}
