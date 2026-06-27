import type { ResumeData } from "../../types/common";
import type { ResumeEditorActions } from "../../hooks/useResumeEditor";
import { TextInput } from "./FormControls";

type HeaderSectionProps = {
  header: ResumeData["header"];
  actions: ResumeEditorActions;
};

export function HeaderSection({ header, actions }: HeaderSectionProps) {
  return (
    <div className="pb-5">
      <h1 className="section-header">Header</h1>
      <div className="flex flex-col gap-3">
        <TextInput
          label="Name"
          name="name"
          value={header.name}
          autoComplete="on"
          placeholder="e.g. Tan Ah Kao"
          onChange={(value) => actions.updateHeaderField("name", value)}
        />
        <TextInput
          label="Email"
          name="email"
          type="email"
          value={header.email}
          autoComplete="on"
          placeholder="e.g. ahkao67@gmail.com"
          onChange={(value) => actions.updateHeaderField("email", value)}
        />
        <TextInput
          label="Phone Number"
          name="phoneNumber"
          value={header.phoneNumber}
          autoComplete="on"
          placeholder="e.g. +60123456789"
          onChange={(value) => actions.updateHeaderField("phoneNumber", value)}
        />
        <TextInput
          label="Location"
          name="location"
          value={header.location}
          autoComplete="on"
          placeholder="e.g. Klang, Selangor"
          onChange={(value) => actions.updateHeaderField("location", value)}
        />
        <TextInput
          label="LinkedIn Profile (optional)"
          name="linkedin"
          type="url"
          value={header.linkedin ?? ""}
          autoComplete="on"
          placeholder="e.g. linkedin.com/in/ahkaotan"
          onChange={(value) => actions.updateHeaderField("linkedin", value)}
        />
      </div>
    </div>
  );
}
