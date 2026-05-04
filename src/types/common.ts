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

interface DateDuration {
    startDate: string;
    endDate: string;
    isCurrent: boolean;
}

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
    employmentDuration: DateDuration;
    description: string[];
}

interface ResumeEducation {
    institutionName: string;
    location: string;
    courseOfStudy: string;
    cgpa: number;
    graduationDate: DateDuration;
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
