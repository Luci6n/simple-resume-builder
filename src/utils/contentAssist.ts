import type { ResumeData } from "../types/common";

type ExperienceItem = ResumeData["experience"][number];
type ProjectItem = ResumeData["projects"][number];

const normalizeRole = (targetRole: string): string =>
  targetRole.trim().toLowerCase() || "the target role";

const toSentence = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return "";

  return trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
};

export const improveResumeLine = (line: string, targetRole: string): string => {
  const role = normalizeRole(targetRole);
  const cleanLine = line.trim() || "delivered measurable improvements";

  return toSentence(`Strengthened ${cleanLine} with clear impact for ${role}`);
};

export const generateResumeSummary = (data: ResumeData, targetRole: string): string => {
  const role = normalizeRole(targetRole);
  const strongestSkills = data.skills
    .flatMap((skill) => skill.skillName)
    .filter(Boolean)
    .slice(0, 4)
    .join(", ");
  const project = data.projects.find((projectItem) => projectItem.projectName)?.projectName;
  const summary = [
    `Detail-oriented ${role} candidate`,
    strongestSkills ? `with hands-on experience in ${strongestSkills}` : "with practical project experience",
    project ? `through projects such as ${project}` : "through academic and personal projects",
    "focused on building clear, reliable, user-friendly products.",
  ].join(" ");

  return summary.slice(0, 350);
};

export const generateExperienceBullet = (
  experience: ExperienceItem | undefined,
  targetRole: string,
): string => {
  const role = normalizeRole(targetRole);
  const title = experience?.positionTitle || "team contributor";
  const company = experience?.companyName || "the organization";

  return toSentence(
    `Translated ${title} responsibilities at ${company} into practical outcomes aligned with ${role} expectations`,
  );
};

export const generateProjectBullet = (
  project: ProjectItem | undefined,
  targetRole: string,
): string => {
  const role = normalizeRole(targetRole);
  const projectName = project?.projectName || "this project";

  return toSentence(
    `Positioned ${projectName} around ${role} needs by emphasizing usability, maintainability, and measurable user value`,
  );
};
