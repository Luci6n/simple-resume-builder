export type CreatorProps = {
    inputData: ResumeData;
    setInputData: React.Dispatch<React.SetStateAction<ResumeData>>;
};

export type PreviewProps = {
    inputData: ResumeData;
};

export type ArraySection =
    "experience"
    | "education"
    | "projects"
    | "skills"
    | "awardsCertification"
    | "languages";

interface ResumeHeader {
    name: string;
    email: string;
    phoneNumber: string;
    location: string;
    linkedin?: string;
}

interface ResumeExperience {
    companyName: string;
    companyLocation: string;
    positionTitle: string;
    employmentDuration: string;
    description: string[];
}

interface ResumeEducation {
    institutionName: string;
    location: string;
    courseOfStudy: string;
    cgpa: number;
    graduationDate: string;
}

interface ResumeProject {
    projectName: string;
    description: string[];
}

interface ResumeSkill {
    skillCategory: string;
    skillName: string[];
}

interface ResumeAwardCertification {
    awardCertificationTitle: string;
}

interface ResumeExtracurricularActivity {
    activityName: string;
}

interface ResumeLanguage {
    languageName: string;
    proficiencyLevel: string;
}

export interface ResumeData {
    header: ResumeHeader;
    summary?: string;
    experience: ResumeExperience[];
    education: ResumeEducation[];
    projects: ResumeProject[];
    skills: ResumeSkill[];
    awardsCertification: ResumeAwardCertification[];
    extracurricularActivities?: ResumeExtracurricularActivity[];
    languages: ResumeLanguage[];
}
