import type { ResumeEditorActions } from "../../hooks/useResumeEditor";

type SummarySectionProps = {
  actions: ResumeEditorActions;
  summary?: string;
};

export function SummarySection({ actions, summary }: SummarySectionProps) {
  return (
    <div className="pb-5">
      <h1 className="section-header">Summary (optional)</h1>
      <label className="flex flex-col gap-2 text-soft-black dark:text-soft-milk text-sm">
        <textarea
          className="form-input min-h-28 max-h-56 resize-y"
          value={summary ?? ""}
          onChange={(event) => actions.updateSummary(event.target.value)}
          maxLength={350}
          placeholder="Max 350 characters."
        />
      </label>
    </div>
  );
}
