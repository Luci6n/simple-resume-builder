import type { ResumeData } from "../../types/common";
import type { ResumeEditorActions } from "../../hooks/useResumeEditor";
import { createEmptyExtracurricularActivity } from "../../utils/resumeEditor";
import { IconDeleteButton } from "./FormControls";

type ActivitiesSectionProps = {
  actions: ResumeEditorActions;
  extracurricularActivities?: ResumeData["extracurricularActivities"];
};

export function ActivitiesSection({
  actions,
  extracurricularActivities,
}: ActivitiesSectionProps) {
  return (
    <div className="pb-5">
      <h1 className="section-header">Extracurricular Activities (optional)</h1>
      {extracurricularActivities?.map((activity, index) => (
        <div key={index} className="flex flex-col gap-3 pb-3">
          <label className="flex items-center gap-2">
            <span className="shrink-0">{"\u2022"}</span>
            <input
              className="form-input flex-1 min-w-0"
              type="text"
              value={activity.activityName}
              placeholder="e.g. XX Committee of YY (year)"
              onChange={(event) =>
                actions.updateArrayItem("extracurricularActivities", index, {
                  activityName: event.target.value,
                })
              }
            />
            <IconDeleteButton
              onClick={() => actions.deleteArrayItem("extracurricularActivities", index)}
            />
          </label>
        </div>
      ))}
      <button
        type="button"
        className="creator-page-button"
        onClick={() =>
          actions.addArrayItem("extracurricularActivities", createEmptyExtracurricularActivity())
        }
      >
        Add Extracurricular Activity
      </button>
    </div>
  );
}
