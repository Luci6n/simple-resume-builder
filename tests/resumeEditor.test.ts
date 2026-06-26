import { describe, expect, test } from "bun:test";
import { sampleData } from "../src/data/resumeData";
import {
  addArrayItem,
  addNestedArrayItem,
  createEmptyEducation,
  createEmptyExperience,
  deleteArrayItem,
  deleteNestedArrayItem,
  updateArrayItem,
  updateDateDuration,
  updateHeaderField,
  updateNestedArrayItem,
  updateSummary,
} from "../src/utils/resumeEditor";
import type { ResumeData } from "../src/types/common";

const cloneSampleData = (): ResumeData => structuredClone(sampleData);

describe("resume editor helpers", () => {
  test("creates empty section records with editable defaults", () => {
    expect(createEmptyExperience()).toEqual({
      companyName: "",
      companyLocation: "",
      positionTitle: "",
      employmentDuration: {
        startDate: "",
        endDate: "",
        isCurrent: false,
      },
      description: [],
    });

    expect(createEmptyEducation()).toEqual({
      institutionName: "",
      location: "",
      courseOfStudy: "",
      cgpa: 0,
      graduationDate: {
        startDate: "",
        endDate: "",
        isCurrent: false,
      },
    });
  });

  test("updates header and summary without mutating the original resume", () => {
    const resume = cloneSampleData();
    const updatedHeader = updateHeaderField(resume, "name", "Nadia Lim");
    const updatedSummary = updateSummary(updatedHeader, "Frontend engineer focused on clear product UI.");

    expect(updatedSummary.header.name).toBe("Nadia Lim");
    expect(updatedSummary.summary).toBe("Frontend engineer focused on clear product UI.");
    expect(resume.header.name).toBe(sampleData.header.name);
    expect(resume.summary).toBe(sampleData.summary);
  });

  test("updates, adds, and deletes section array items immutably", () => {
    const resume = cloneSampleData();
    const withUpdatedProject = updateArrayItem(resume, "projects", 0, {
      projectName: "Portfolio Builder",
    });
    const withExtraProject = addArrayItem(withUpdatedProject, "projects", {
      projectName: "Interview Tracker",
      description: [],
    });
    const withDeletedProject = deleteArrayItem(withExtraProject, "projects", 1);

    expect(withUpdatedProject.projects[0].projectName).toBe("Portfolio Builder");
    expect(withExtraProject.projects).toHaveLength(resume.projects.length + 1);
    expect(withDeletedProject.projects.map((project) => project.projectName)).toEqual([
      "Portfolio Builder",
      "Interview Tracker",
    ]);
    expect(resume.projects[0].projectName).toBe(sampleData.projects[0].projectName);
  });

  test("updates nested arrays and date durations immutably", () => {
    const resume = cloneSampleData();
    const withUpdatedBullet = updateNestedArrayItem(
      resume,
      "experience",
      0,
      "description",
      0,
      "Built accessible form controls for resume editing.",
    );
    const withAddedSkill = addNestedArrayItem(
      withUpdatedBullet,
      "skills",
      0,
      "skillName",
      "Accessibility",
    );
    const withDeletedSkill = deleteNestedArrayItem(withAddedSkill, "skills", 0, "skillName", 1);
    const withCurrentEducation = updateDateDuration(
      withDeletedSkill,
      "education",
      0,
      "graduationDate",
      "isCurrent",
      true,
    );

    expect(withUpdatedBullet.experience[0].description[0]).toBe(
      "Built accessible form controls for resume editing.",
    );
    expect(withAddedSkill.skills[0].skillName).toContain("Accessibility");
    expect(withDeletedSkill.skills[0].skillName).not.toContain("TypeScript");
    expect(withCurrentEducation.education[0].graduationDate.isCurrent).toBe(true);
    expect(resume.experience[0].description[0]).toBe(sampleData.experience[0].description[0]);
  });
});
