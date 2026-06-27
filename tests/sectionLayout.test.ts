import { describe, expect, test } from "bun:test";
import { sampleData } from "../src/data/resumeData";
import {
  addCustomSection,
  defaultSectionOrder,
  deleteCustomSection,
  moveSection,
  normalizeResumeData,
  updateCustomSection,
} from "../src/utils/sectionLayout";
import type { ResumeData } from "../src/types/common";

const cloneSampleData = (): ResumeData => structuredClone(sampleData);

describe("section layout helpers", () => {
  test("normalizes old saved resume data with the default section order", () => {
    const legacyResume = cloneSampleData();
    delete legacyResume.sectionOrder;
    delete legacyResume.customSections;

    const normalized = normalizeResumeData(legacyResume);

    expect(normalized.sectionOrder).toEqual(defaultSectionOrder);
    expect(normalized.customSections).toEqual([]);
  });

  test("moves sections and ignores out-of-range moves", () => {
    const resume = normalizeResumeData(cloneSampleData());
    const moved = moveSection(resume, "projects", -2);
    const unchanged = moveSection(moved, "projects", -10);

    expect(moved.sectionOrder?.slice(0, 3)).toEqual(["summary", "projects", "experience"]);
    expect(unchanged.sectionOrder).toEqual(moved.sectionOrder);
  });

  test("adds, updates, and deletes custom sections", () => {
    const resume = normalizeResumeData(cloneSampleData());
    const withCustom = addCustomSection(resume);
    const customId = withCustom.customSections?.[0]?.id;

    expect(customId).toStartWith("custom-");

    const updated = updateCustomSection(withCustom, customId, {
      title: "Community",
      items: ["Mentored first-year web developers."],
    });
    const deleted = deleteCustomSection(updated, customId);

    expect(updated.sectionOrder).toContain(customId);
    expect(updated.customSections?.[0]).toMatchObject({
      title: "Community",
      items: ["Mentored first-year web developers."],
    });
    expect(deleted.sectionOrder).not.toContain(customId);
    expect(deleted.customSections).toHaveLength(0);
  });
});
