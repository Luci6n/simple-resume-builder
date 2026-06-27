import { useState } from "react";
import type { ResumeCustomSection, ResumeData, ResumeSectionId } from "../../types/common";
import type { ResumeEditorActions } from "../../hooks/useResumeEditor";
import { defaultSectionOrder, getSectionLabel } from "../../utils/sectionLayout";
import { IconDeleteButton } from "./FormControls";
import { ArrowDownIcon } from "@phosphor-icons/react/dist/csr/ArrowDown";
import { ArrowUpIcon } from "@phosphor-icons/react/dist/csr/ArrowUp";
import { DotsSixVerticalIcon } from "@phosphor-icons/react/dist/csr/DotsSixVertical";
import { PlusIcon } from "@phosphor-icons/react/dist/csr/Plus";

type SectionManagerProps = {
  actions: ResumeEditorActions;
  inputData: ResumeData;
};

export function SectionManager({ actions, inputData }: SectionManagerProps) {
  const [draggedSectionId, setDraggedSectionId] = useState<ResumeSectionId | null>(null);
  const sectionOrder = inputData.sectionOrder ?? defaultSectionOrder;

  return (
    <div className="pb-5">
      <h1 className="section-header">Sections</h1>
      <div className="flex flex-col gap-2 text-sm">
        {sectionOrder.map((sectionId, index) => {
          const customSection = inputData.customSections?.find((section) => section.id === sectionId);

          return (
            <div
              key={sectionId}
              className="section-manager-row"
              draggable
              onDragStart={() => setDraggedSectionId(sectionId)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (draggedSectionId) {
                  actions.reorderSections(draggedSectionId, sectionId);
                  setDraggedSectionId(null);
                }
              }}
            >
              <DotsSixVerticalIcon size={22} className="shrink-0 cursor-grab" />
              <span className="flex-1 font-bold">{getSectionLabel(sectionId, inputData)}</span>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`Move ${getSectionLabel(sectionId, inputData)} up`}
                  disabled={index === 0}
                  onClick={() => actions.moveSection(sectionId, -1)}
                >
                  <ArrowUpIcon size={18} />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`Move ${getSectionLabel(sectionId, inputData)} down`}
                  disabled={index === sectionOrder.length - 1}
                  onClick={() => actions.moveSection(sectionId, 1)}
                >
                  <ArrowDownIcon size={18} />
                </button>
              </div>
              {customSection ? (
                <IconDeleteButton onClick={() => actions.deleteCustomSection(customSection.id)} />
              ) : undefined}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="creator-page-button mt-4 flex items-center justify-center gap-2"
        onClick={actions.addCustomSection}
      >
        <PlusIcon size={18} />
        <span>Add Custom Section</span>
      </button>
      <div className="mt-5 flex flex-col gap-5">
        {inputData.customSections?.map((section) => (
          <CustomSectionEditor key={section.id} actions={actions} section={section} />
        ))}
      </div>
    </div>
  );
}

type CustomSectionEditorProps = {
  actions: ResumeEditorActions;
  section: ResumeCustomSection;
};

function CustomSectionEditor({ actions, section }: CustomSectionEditorProps) {
  return (
    <div className="rounded-md border border-current/10 p-3">
      <label className="form-label">
        <span className="form-label-text">Custom title</span>
        <input
          className="form-input"
          type="text"
          value={section.title}
          onChange={(event) =>
            actions.updateCustomSection(section.id, { title: event.target.value })
          }
        />
      </label>
      <div className="mt-3 text-soft-black dark:text-soft-milk text-sm">
        <span className="form-label-text">Items</span>
        <ul>
          {section.items.map((item, index) => (
            <li key={index} className="flex items-center gap-2 py-1">
              <span className="shrink-0">{"\u2022"}</span>
              <input
                className="form-input flex-1 min-w-0"
                type="text"
                value={item}
                onChange={(event) => {
                  const nextItems = section.items.map((currentItem, itemIndex) =>
                    itemIndex === index ? event.target.value : currentItem,
                  );
                  actions.updateCustomSection(section.id, { items: nextItems });
                }}
              />
              <IconDeleteButton
                onClick={() =>
                  actions.updateCustomSection(section.id, {
                    items: section.items.filter((_, itemIndex) => itemIndex !== index),
                  })
                }
              />
            </li>
          ))}
          <li className="flex items-center gap-2 py-1">
            <span className="shrink-0">{"\u2022"}</span>
            <button
              type="button"
              className="creator-page-button mt-0"
              onClick={() => actions.updateCustomSection(section.id, { items: [...section.items, ""] })}
            >
              +
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
