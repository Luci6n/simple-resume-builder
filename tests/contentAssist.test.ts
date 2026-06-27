import { describe, expect, test } from "bun:test";
import { sampleData } from "../src/data/resumeData";
import {
  generateExperienceBullet,
  generateProjectBullet,
  generateResumeSummary,
  improveResumeLine,
} from "../src/utils/contentAssist";
import type { ResumeData } from "../src/types/common";

const cloneSampleData = (): ResumeData => structuredClone(sampleData);

describe("content assistant helpers", () => {
  test("generates role-aware resume content without mutating the resume", () => {
    const resume = cloneSampleData();
    const summary = generateResumeSummary(resume, "frontend developer");
    const experienceBullet = generateExperienceBullet(resume.experience[0], "frontend developer");
    const projectBullet = generateProjectBullet(resume.projects[0], "frontend developer");
    const improvedLine = improveResumeLine("made dashboards", "frontend developer");

    expect(summary).toContain("frontend developer");
    expect(summary.length).toBeLessThanOrEqual(350);
    expect(experienceBullet).toContain("frontend developer");
    expect(projectBullet).toContain("frontend developer");
    expect(improvedLine).toContain("frontend developer");
    expect(resume.summary).toBe(sampleData.summary);
  });
});
