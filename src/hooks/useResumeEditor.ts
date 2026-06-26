import { useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ResumeCustomSection, ResumeData, ResumeSectionId } from "../types/common";
import {
  addCustomSection,
  deleteCustomSection,
  moveSection,
  reorderSections,
  updateCustomSection,
} from "../utils/sectionLayout";
import {
  addArrayItem,
  addNestedArrayItem,
  deleteArrayItem,
  deleteNestedArrayItem,
  updateArrayItem,
  updateDateDuration,
  updateHeaderField,
  updateNestedArrayItem,
  updateSummary,
} from "../utils/resumeEditor";
import type {
  DateDurationField,
  DateDurationKey,
  DateDurationSection,
  DateDurationValue,
  NestedArraySection,
  NestedField,
  ResumeArraySection,
  SectionItem,
} from "../utils/resumeEditor";

export type ResumeEditorActions = {
  updateHeaderField: (field: keyof ResumeData["header"], value: string) => void;
  updateSummary: (summary: string) => void;
  updateArrayItem: <Section extends ResumeArraySection>(
    section: Section,
    index: number,
    patch: Partial<SectionItem<Section>>,
  ) => void;
  addArrayItem: <Section extends ResumeArraySection>(
    section: Section,
    newItem: SectionItem<Section>,
  ) => void;
  deleteArrayItem: <Section extends ResumeArraySection>(section: Section, index: number) => void;
  updateNestedArrayItem: <Section extends NestedArraySection>(
    section: Section,
    itemIndex: number,
    field: NestedField<Section>,
    valueIndex: number,
    value: string,
  ) => void;
  addNestedArrayItem: <Section extends NestedArraySection>(
    section: Section,
    itemIndex: number,
    field: NestedField<Section>,
    newItem: string,
  ) => void;
  deleteNestedArrayItem: <Section extends NestedArraySection>(
    section: Section,
    itemIndex: number,
    field: NestedField<Section>,
    valueIndex: number,
  ) => void;
  updateDateDuration: <
    Section extends DateDurationSection,
    Field extends DateDurationField<Section>,
    Key extends DateDurationKey,
  >(
    section: Section,
    index: number,
    field: Field,
    dateField: Key,
    value: DateDurationValue<Key>,
  ) => void;
  moveSection: (sectionId: ResumeSectionId, offset: number) => void;
  reorderSections: (fromSectionId: ResumeSectionId, toSectionId: ResumeSectionId) => void;
  addCustomSection: () => void;
  updateCustomSection: (
    sectionId: ResumeCustomSection["id"],
    patch: Partial<Omit<ResumeCustomSection, "id">>,
  ) => void;
  deleteCustomSection: (sectionId: ResumeCustomSection["id"]) => void;
};

export const useResumeEditor = (
  setInputData: Dispatch<SetStateAction<ResumeData>>,
): ResumeEditorActions =>
  useMemo(
    () => ({
      updateHeaderField: (field, value) => {
        setInputData((current) => updateHeaderField(current, field, value));
      },
      updateSummary: (summary) => {
        setInputData((current) => updateSummary(current, summary));
      },
      updateArrayItem: (section, index, patch) => {
        setInputData((current) => updateArrayItem(current, section, index, patch));
      },
      addArrayItem: (section, newItem) => {
        setInputData((current) => addArrayItem(current, section, newItem));
      },
      deleteArrayItem: (section, index) => {
        setInputData((current) => deleteArrayItem(current, section, index));
      },
      updateNestedArrayItem: (section, itemIndex, field, valueIndex, value) => {
        setInputData((current) =>
          updateNestedArrayItem(current, section, itemIndex, field, valueIndex, value),
        );
      },
      addNestedArrayItem: (section, itemIndex, field, newItem) => {
        setInputData((current) => addNestedArrayItem(current, section, itemIndex, field, newItem));
      },
      deleteNestedArrayItem: (section, itemIndex, field, valueIndex) => {
        setInputData((current) =>
          deleteNestedArrayItem(current, section, itemIndex, field, valueIndex),
        );
      },
      updateDateDuration: (section, index, field, dateField, value) => {
        setInputData((current) =>
          updateDateDuration(current, section, index, field, dateField, value),
        );
      },
      moveSection: (sectionId, offset) => {
        setInputData((current) => moveSection(current, sectionId, offset));
      },
      reorderSections: (fromSectionId, toSectionId) => {
        setInputData((current) => reorderSections(current, fromSectionId, toSectionId));
      },
      addCustomSection: () => {
        setInputData((current) => addCustomSection(current));
      },
      updateCustomSection: (sectionId, patch) => {
        setInputData((current) => updateCustomSection(current, sectionId, patch));
      },
      deleteCustomSection: (sectionId) => {
        setInputData((current) => deleteCustomSection(current, sectionId));
      },
    }),
    [setInputData],
  );
