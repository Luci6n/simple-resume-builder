import type { ResumeData } from "../../types/common";
import type { ResumeEditorActions } from "../../hooks/useResumeEditor";
import { createEmptyAwardCertification } from "../../utils/resumeEditor";
import { IconDeleteButton } from "./FormControls";

type AwardsSectionProps = {
  actions: ResumeEditorActions;
  awardsCertification: ResumeData["awardsCertification"];
};

export function AwardsSection({ actions, awardsCertification }: AwardsSectionProps) {
  return (
    <div className="pb-5">
      <h1 className="section-header">Awards & Certifications</h1>
      {awardsCertification.map((awardCertification, index) => (
        <div key={index} className="flex flex-col gap-3 pb-3">
          <label className="flex items-center gap-2">
            <span className="shrink-0">{"\u2022"}</span>
            <input
              className="form-input flex-1 min-w-0"
              type="text"
              value={awardCertification.awardCertificationTitle}
              placeholder="e.g. Google XXX Certificate (year)"
              onChange={(event) =>
                actions.updateArrayItem("awardsCertification", index, {
                  awardCertificationTitle: event.target.value,
                })
              }
            />
            <IconDeleteButton onClick={() => actions.deleteArrayItem("awardsCertification", index)} />
          </label>
        </div>
      ))}
      <button
        type="button"
        className="creator-page-button"
        onClick={() =>
          actions.addArrayItem("awardsCertification", createEmptyAwardCertification())
        }
      >
        Add Award/Certification
      </button>
    </div>
  );
}
