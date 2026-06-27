import type { ResumeData } from "../../types/common";
import type { ResumeEditorActions } from "../../hooks/useResumeEditor";
import { createEmptyLanguage } from "../../utils/resumeEditor";
import { SectionDeleteButton, TextInput } from "./FormControls";

type LanguagesSectionProps = {
  actions: ResumeEditorActions;
  languages: ResumeData["languages"];
};

export function LanguagesSection({ actions, languages }: LanguagesSectionProps) {
  return (
    <div className="pb-5">
      <h1 className="section-header">Languages</h1>
      {languages.map((language, index) => (
        <div key={index} className="flex flex-col gap-2 py-3">
          <TextInput
            label="Language"
            value={language.languageName}
            onChange={(value) => actions.updateArrayItem("languages", index, { languageName: value })}
          />
          <TextInput
            label="Proficiency"
            value={language.proficiencyLevel}
            onChange={(value) =>
              actions.updateArrayItem("languages", index, { proficiencyLevel: value })
            }
          />
          <SectionDeleteButton onClick={() => actions.deleteArrayItem("languages", index)}>
            Delete Language?
          </SectionDeleteButton>
        </div>
      ))}
      <button
        type="button"
        className="creator-page-button mt-0"
        onClick={() => actions.addArrayItem("languages", createEmptyLanguage())}
      >
        Add Language
      </button>
    </div>
  );
}
