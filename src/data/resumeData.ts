import type { ResumeData } from "../types/common"

export const resumeData: ResumeData = {
    header: {
        name: "",
        email: "",
        phoneNumber: "",
        location: "",
        linkedin: "",
    },
    experience: [
        {
            companyName: "",
            employmentDuration: "",
            description: [""]
        }
    ],
    education: [
        {
            institutionName: "",
            location: "",
            courseOfStudy: "",
            cgpa: 0,
            graduationDate: ""
        }
    ],
    projects: [
        {
            projectName: "",
            description: [""]
        }
    ],
    skills: [
        {
            skillCategory: "",
            skillName: []
        }
    ],
    awardsCertification: [
        {
            awardCertificationTitle: ""
        }
    ],
    extracurricularActivities: [
        {
            activityName: ""
        }
    ],
    languages: [
        {
            languageName: "",
            proficiencyLevel: ""
        }
    ]
}