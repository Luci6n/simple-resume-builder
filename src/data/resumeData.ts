import type { ResumeData } from "../types/common"

// sample data
export const sampleData: ResumeData = {
    header: {
        name: "Alex Tan",
        email: "alex.tan@example.com",
        phoneNumber: "+60 12-345 6789",
        location: "Kuala Lumpur, Malaysia",
        linkedin: "linkedin.com/in/alextan",
    },
    summary: "Computer Science student with a passion for frontend development and user experience design. Experienced in building responsive web applications using React and TypeScript. Strong problem-solving skills and a keen eye for detail.",
    experience: [
        {
            companyName: "BrightWorks Studio",
            companyLocation: "Kuala Lumpur, Malaysia",
            positionTitle: "Frontend Developer Intern",
            employmentDuration: {
                startDate:"2024-01", 
                endDate: "2024-06", 
                isCurrent: true
            },
            description: [
                "Built responsive React interfaces for client dashboards.",
                "Improved form state handling and reduced repeated UI code."
            ]
        },
        {
            companyName: "Campus Tech Club",
            companyLocation: "University of Malaya",
            positionTitle: "Event Coordinator",
            employmentDuration: {
                startDate:"2023-03", 
                endDate: "2023-10", 
                isCurrent: false
            },           
            description: [
                "Led weekly coding workshops for beginner web developers.",
                "Maintained internal tools for event registration."
            ]
        }
    ],
    education: [
        {
            institutionName: "University of Malaya",
            location: "Kuala Lumpur, Malaysia",
            courseOfStudy: "Bachelor of Computer Science",
            cgpa: 3.72,
            graduationDate: {
                startDate:"2023-07", 
                endDate: "2026-07", 
                isCurrent: false
            }, 
        },
        {
            institutionName: "Taylor's College",
            location: "Subang Jaya, Malaysia",
            courseOfStudy: "Foundation in Computing",
            cgpa: 3.85,
            graduationDate: {
                startDate:"2021-11", 
                endDate: "2022-11", 
                isCurrent: true
            }, 
        }
    ],
    projects: [
        {
            projectName: "Simple Resume Builder",
            description: [
                "Created a live resume editor with React and TypeScript.",
                "Persisted form data locally using browser localStorage."
            ]
        },
        {
            projectName: "Study Planner",
            description: [
                "Designed a task planner for weekly study sessions.",
                "Added reusable components for subjects, tasks, and deadlines."
            ]
        }
    ],
    skills: [
        {
            skillCategory: "Frontend",
            skillName: ["React", "TypeScript", "Tailwind CSS"]
        },
        {
            skillCategory: "Tools",
            skillName: ["Git", "Vite", "VS Code"]
        }
    ],
    awardsCertification: [
        {
            awardCertificationTitle: "Dean's List 2024"
        },
        {
            awardCertificationTitle: "Responsive Web Design Certification"
        }
    ],
    extracurricularActivities: [
        {
            activityName: "Volunteer mentor for beginner programming workshops"
        },
        {
            activityName: "Committee member of university technology society"
        }
    ],
    languages: [
        {
            languageName: "English",
            proficiencyLevel: "Fluent"
        },
        {
            languageName: "Malay",
            proficiencyLevel: "Native"
        }
    ]
}

// blank data
export const blankData: ResumeData = {
    header: {
        name: "",
        email: "",
        phoneNumber: "",
        location: "",
        linkedin: "",
    },
    summary: "",
    experience: [
        {
            companyName: "",
            companyLocation: "",
            positionTitle: "",
            employmentDuration: {
                startDate:"", 
                endDate: "", 
                isCurrent: false
            }, 
            description: [""]
        },
        {
            companyName: "",
            companyLocation: "",
            positionTitle: "",
            employmentDuration: {
                startDate:"", 
                endDate: "", 
                isCurrent: false
            },
            description: [""]
        }
    ],
    education: [
        {
            institutionName: "",
            location: "",
            courseOfStudy: "",
            cgpa: 0,
            graduationDate: {
                startDate:"", 
                endDate: "", 
                isCurrent: false
            }
        },
        {
            institutionName: "",
            location: "",
            courseOfStudy: "",
            cgpa: 0,
            graduationDate: {
                startDate:"", 
                endDate: "", 
                isCurrent: false
            }
        }
    ],
    projects: [
        {
            projectName: "",
            description: [""]
        },
        {
            projectName: "",
            description: [""]
        }
    ],
    skills: [
        {
            skillCategory: "",
            skillName: [""]
        },
        {
            skillCategory: "",
            skillName: [""]
        }
    ],
    awardsCertification: [
        {
            awardCertificationTitle: ""
        },
        {
            awardCertificationTitle: ""
        }
    ],
    extracurricularActivities: [
        {
            activityName: ""
        },
        {
            activityName: ""
        }
    ],
    languages: [
        {
            languageName: "",
            proficiencyLevel: ""
        },
        {
            languageName: "",
            proficiencyLevel: ""
        }
    ]
}
