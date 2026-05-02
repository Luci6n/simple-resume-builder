import type { CreatorProps, ArraySection, ResumeData } from "../types/common";
import { TrashIcon } from "@phosphor-icons/react/dist/csr/Trash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Creator({ inputData, setInputData }: CreatorProps) {
    // handler functiion for updating information in header section
    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputData(prev => ({
            ...prev,
            header:{
                ...prev?.header,
                [name]: value
            }
        }))
        
    }

    const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputData(prev => ({
            ...prev,
            summary: e.target.value
        }));
    }

    // generic handler function for updating information in array sections 
    // (experience, education, projects, skills, awardsCertification, extracurricularActivities, languages)
    const handleSectionArrayChange = <
        Section extends "experience" | "education" | "projects" | "skills" | "awardsCertification" | "extracurricularActivities" | "languages"
    >(
        section: Section, 
        index: number, 
        field: string, 
        value: string | number
    ) => {
        setInputData(prev => ({
            ...prev,
            [section]: prev?.[section]?.map((item, i) =>
                i === index
                    ? { ...item, [field]: value }
                    : item
            )
        }))
    }

    // generic handler function for updating information in nested array fields 
    // (experience and projects description, skills skillName)
    const handleExperienceProjectsNestedArrayChange = (
        section: "experience" | "projects",
        itemIndex: number,
        field: "description",
        valueIndex: number,
        value: string
    ) => {
        setInputData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) =>
                i === itemIndex
                    ? {
                        ...item,
                        [field]: item[field].map((text, j) =>
                            j === valueIndex ? value : text
                        )
                    }
                    : item
            )
        }));
    };

    // separate handler function for skills.skillName nested array 
    // since it is the only nested array that is 2 levels deep instead of 3 levels deep like experience and projects descriptions
    const handleSkillsNestedArrayChange = (
        itemIndex: number,
        valueIndex: number,
        value: string
    ) => {
        setInputData(prev => ({
            ...prev,
            skills: prev.skills.map((item, i) =>
                i === itemIndex
                    ? {
                        ...item,
                        skillName: item.skillName.map((text, j) =>
                            j === valueIndex ? value : text
                        )
                    }
                    : item
            )
        }));
    };

    // generic function to add new items to array sections 
    // (experience, education, projects, skills, awardsCertification, extracurricularActivities, languages)
    const handleAddArrayItem = <Section extends ArraySection>(
        section: Section,
        newItem: ResumeData[Section][number]
    ) => {
        setInputData(prev => ({
            ...prev,
            [section]: [
                ...prev[section],
                newItem
            ]
        }));
    };

    // separate function to add new items to extracurricularActivities section 
    // since it is an optional section and can be undefined
    const handleAddOptionalArrayItem = <Section extends "extracurricularActivities">(
        section: Section,
        newItem: NonNullable<ResumeData[Section]>[number]
    ) => {
        setInputData(prev => ({
            ...prev,
            [section]: [
                ...(prev[section] ?? []),
                newItem
            ]
        }));
    };

    // generic function to add new items to nested array fields
    const handleAddNestedArrayItem = <Section extends "experience" | "projects" | "skills">(
        section: Section,
        itemIndex: number,
        field: Section extends "skills" ? "skillName" : "description",
        newItem: string
    ) => {
        setInputData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) => {
                if (i !== itemIndex) return item;

                const currentValues = item[field as keyof typeof item] as string[];
                // tells TypeScript: “trust me, this field exists here and it is a string array.”

                return {
                    ...item,
                    [field]: [...currentValues, newItem]
                };
            })
        }));
    }

    // helper functions to create empty items for each array section when adding new items
    const createEmptyExperience = (): ResumeData["experience"][number] => ({
        companyName: "",
        companyLocation: "",
        positionTitle: "",
        employmentDuration: "",
        description: []
    });

    const createEmptyEducation = (): ResumeData["education"][number] => ({
        institutionName: "",
        location: "",
        courseOfStudy: "",
        cgpa: 0,
        graduationDate: ""
    });

    const createEmptyProject = (): ResumeData["projects"][number] => ({
        projectName: "",
        description: []
    });

    const createEmptySkill = (): ResumeData["skills"][number] => ({
        skillCategory: "",
        skillName: []
    });

    const createEmptyAwardCertification = (): ResumeData["awardsCertification"][number] => ({
        awardCertificationTitle: ""
    });

    const createEmptyExtracurricularActivity = (): NonNullable<ResumeData["extracurricularActivities"]>[number] => ({
        activityName: ""
    });

    const createEmptyLanguage = (): ResumeData["languages"][number] => ({
        languageName: "",
        proficiencyLevel: ""
    });

    // for learning purposes only
    // const handleNestedArrayChange = ( got error
    //     section: "experience" | "projects" | "skills",
    //     itemIndex: number,
    //     field: "description",
    //     valueIndex: number,
    //     value: string
    // ) => {
    //     setInputData(prev => ({
    //         ...prev,
    //         [section]: prev[section].map((item, i) =>
    //             i === itemIndex
    //                 ? {
    //                     ...item,
    //                     [field]: item[field].map((text, j) =>
    //                         j === valueIndex ? value : text
    //                     )
    //                 }
    //                 : item
    //         )
    //     }));
    // };

    // const handleAddSectionItem = <K extends keyof ResumeData>(
    //     section: K,
    //     newItem: ResumeData[K] extends Array<infer Item> ? Item : never
    // ) => {
    //     setInputData(prev => ({
    //         ...prev,
    //         [section]: [
    //             ...(prev[section] as unknown[]),
    //             newItem
    //         ]
    //     }));
    // };

    // type NestedArrayFieldMap = {
    //     experience: "description";
    //     projects: "description";
    //     skills: "skillName";
    // };

    // const handleNestedArrayChange = <
    //     Section extends keyof NestedArrayFieldMap
    // >(
    //     section: Section,
    //     itemIndex: number,
    //     field: NestedArrayFieldMap[Section],
    //     valueIndex: number,
    //     value: string
    // ) => {
    //     setInputData(prev => ({
    //         ...prev,
    //         [section]: prev[section].map((item, i) =>
    //             i === itemIndex
    //                 ? {
    //                     ...item,
    //                     [field]: item[field].map((text, j) =>
    //                         j === valueIndex ? value : text
    //                     )
    //                 }
    //                 : item
    //         )
    //     }));
    // };

    // const handleNestedArrayChange = <
    //     Section extends keyof NestedArrayFieldMap
    // >(
    //     section: Section,
    //     itemIndex: number,
    //     field: NestedArrayFieldMap[Section],
    //     valueIndex: number,
    //     value: string
    // ) => {
    //     setInputData(prev => ({
    //         ...prev,
    //         [section]: prev[section].map((item, i) => {
    //             if (i !== itemIndex) return item;

    //             const currentValues = item[field as keyof typeof item] as string[];

    //             return {
    //                 ...item,
    //                 [field]: currentValues.map((text, j) =>
    //                     j === valueIndex ? value : text
    //                 )
    //             };
    //         })
    //     }));
    // };

    return (
        <div className="max-h-300 flex flex-col divide-y gap-5 px-20 py-10 font-mono overflow-auto">
            <div className="pb-5">
                <h1 className="section-header">Header</h1>
                <div className="flex flex-col gap-3">
                    <label className="form-label">
                        <span className="form-label-text">Name</span>
                        <input className="form-input" name="name" type="text" value={inputData.header.name} onChange={handleHeaderChange}/>
                    </label>
                    <label className="form-label">
                        <span className="form-label-text">Email</span>
                        <input className="form-input" name="email" type="email" value={inputData.header.email} onChange={handleHeaderChange}/>
                    </label>
                    <label className="form-label">
                        <span className="form-label-text">Phone Number</span>
                        <input className="form-input" name="phoneNumber" type="text" value={inputData.header.phoneNumber} onChange={handleHeaderChange}/>
                    </label>
                    <label className="form-label">
                        <span className="form-label-text">Location</span>
                        <input className="form-input" name="location" type="text" value={inputData.header.location} onChange={handleHeaderChange}/>
                    </label>
                    <label className="form-label">
                        <span className="form-label-text">LinkedIn Profile (optional)</span>
                        <input className="form-input" name="linkedin" type="text" value={inputData.header.linkedin} onChange={handleHeaderChange}/>
                    </label>
                </div>
            </div>
            <div className="pb-5">
                <h1 className="section-header">Summary (optional)</h1>
                <label className="flex flex-col gap-2 text-soft-black dark:text-soft-milk text-sm">
                    <span className="form-label-text">Professional Summary</span>
                    <textarea
                        className="form-input min-h-28 resize-y"
                        value={inputData.summary ?? ""}
                        onChange={handleSummaryChange}
                    />
                </label>
            </div>
            <div className="pb-5">                
                <h1 className="section-header">Experience</h1>
                {inputData.experience.map((experience, index) => (
                    <div key={index} className="experience flex flex-col gap-3 pb-3">
                        <label className="form-label">
                            <span className="form-label-text">Company Name</span>
                            <input 
                                className="form-input" 
                                type="text" 
                                value={experience.companyName}
                                onChange={(e) =>
                                    handleSectionArrayChange("experience", index, "companyName", e.target.value)
                                }
                            />
                        </label>
                        <label className="form-label">
                            <span className="form-label-text">Company Location</span>
                            <input 
                                className="form-input" 
                                type="text" 
                                value={experience.companyLocation}
                                onChange={(e) =>
                                    handleSectionArrayChange("experience", index, "companyLocation", e.target.value)
                                }
                            />
                        </label>
                        <label className="form-label">
                            <span className="form-label-text">Position Title</span>
                            <input 
                                className="form-input" 
                                type="text" 
                                value={experience.positionTitle}
                                onChange={(e) =>
                                    handleSectionArrayChange("experience", index, "positionTitle", e.target.value)
                                }
                            />
                        </label>
                        <label className="form-label">
                            <span className="form-label-text">Employment duration</span>
                            <input 
                                className="form-input" 
                                type="month"
                                value={experience.employmentDuration}
                                onChange={(e) =>
                                    handleSectionArrayChange("experience", index, "employmentDuration", e.target.value)
                                } 
                            />
                        </label>
                        <div className="text-soft-black dark:text-soft-milk text-sm">
                            <span className="form-label-text">Description</span>
                            <ul>
                                {experience.description.map((description, descIndex) => (
                                    <li key={descIndex} className="flex items-center gap-2 py-1">
                                        <span className="shrink-0">{'\u2022'}</span>
                                        <input 
                                            className="form-input flex-1 min-w-0" 
                                            type="text"
                                            value={description}
                                            onChange={(e) =>
                                                handleExperienceProjectsNestedArrayChange("experience", index, "description", descIndex, e.target.value)
                                            } 
                                        />
                                        <button><TrashIcon size={32} /></button>
                                    </li>
                                ))}
                                <li className="flex items-center gap-2">
                                    <span className="shrink-0">{'\u2022'}</span>
                                    <button 
                                        type="button"
                                        className="creator-page-button"
                                        onClick={() => handleAddNestedArrayItem("experience", index, "description", "")}
                                    >
                                        +
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
                <button 
                    className="creator-page-button mt-0"
                    onClick={() => handleAddArrayItem("experience", createEmptyExperience())}
                >
                        Add Experience
                </button>
            </div>
            <div className="pb-5">
                <h1 className="section-header">Education</h1>
                {inputData.education.map((education, index) => (
                    <div key={index} className="education flex flex-col gap-3 pb-5">
                        <label className="form-label">
                            <span className="form-label-text">Institution Name</span>
                            <input
                                className="form-input"
                                type="text"
                                value={education.institutionName}
                                onChange={(e) =>
                                    handleSectionArrayChange("education", index, "institutionName", e.target.value)
                                }
                            />
                        </label>
                        <label className="form-label">
                            <span className="form-label-text">Location</span>
                            <input
                                className="form-input"
                                type="text"
                                value={education.location}
                                onChange={(e) =>
                                    handleSectionArrayChange("education", index, "location", e.target.value)
                                }
                            />
                        </label>
                        <label className="form-label">
                            <span className="form-label-text">Course of Study</span>
                            <input
                                className="form-input"
                                type="text"
                                value={education.courseOfStudy}
                                onChange={(e) =>
                                    handleSectionArrayChange("education", index, "courseOfStudy", e.target.value)
                                }
                            />
                        </label>
                        <label className="form-label">
                            <span className="form-label-text">CGPA</span>
                            <input
                                className="form-input"
                                type="number"
                                max="5"
                                min="0"
                                step="0.01"
                                value={education.cgpa}
                                onChange={(e) =>
                                    handleSectionArrayChange("education", index, "cgpa", Number(e.target.value))
                                }
                            />
                        </label>
                        <label className="form-label">
                            <span className="form-label-text">Graduation Date</span>
                            <input
                                className="form-input"
                                type="month"
                                value={education.graduationDate}
                                onChange={(e) =>
                                    handleSectionArrayChange("education", index, "graduationDate", e.target.value)
                                }
                            />
                        </label>
                    </div>
                ))}
                <button
                    className="creator-page-button mt-0"
                    onClick={() => handleAddArrayItem("education", createEmptyEducation())}
                >
                    Add Education
                </button>
            </div>
            <div className="pb-5">                
                <h1 className="section-header">Projects</h1>
                {inputData.projects.map((project, index) => (
                    <div key={index} className="projects flex flex-col gap-3">
                        <label className="form-label">
                            <span className="form-label-text">Project Title</span>
                            <input
                                className="form-input"
                                type="text"
                                value={project.projectName}
                                onChange={(e) =>
                                    handleSectionArrayChange("projects", index, "projectName", e.target.value)
                                }
                            />
                        </label>
                        <div className="text-soft-black dark:text-soft-milk text-sm">
                            <span className="form-label-text">Description</span>
                            <ul>
                                {project.description.map((description, descIndex) => (
                                    <li key={descIndex} className="flex items-center gap-2 py-1">
                                        <span className="shrink-0">{'\u2022'}</span>
                                        <input
                                            className="form-input flex-1 min-w-0"
                                            type="text"
                                            value={description}
                                            onChange={(e) =>
                                                handleExperienceProjectsNestedArrayChange("projects", index, "description", descIndex, e.target.value)
                                            }
                                        />
                                    </li>
                                ))}
                                <li className="flex items-center gap-2 py-1">
                                    <span className="shrink-0">{'\u2022'}</span>
                                    <button
                                        type="button"
                                        className="creator-page-button"
                                        onClick={() => handleAddNestedArrayItem("projects", index, "description", "")}
                                    >
                                        +
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
                <button
                    className="creator-page-button"
                    onClick={() => handleAddArrayItem("projects", createEmptyProject())}
                >
                    Add Project
                </button>
            </div>
            <div className="pb-5">                
                <h1 className="section-header">Technical Skills</h1>
                {inputData.skills.map((skill, index) => (
                    <div key={index} className="skills flex flex-col gap-3">
                        <label className="form-label">
                            <span className="form-label-text">Skill Category</span>
                            <input
                                className="form-input"
                                type="text"
                                value={skill.skillCategory}
                                onChange={(e) =>
                                    handleSectionArrayChange("skills", index, "skillCategory", e.target.value)
                                }
                            />
                        </label>
                        <div className="text-soft-black dark:text-soft-milk text-sm">
                            <span className="form-label-text">Skill</span>
                            <ul>
                                {skill.skillName.map((skillName, skillIndex) => (
                                    <li key={skillIndex} className="flex items-center gap-2 py-1">
                                        <span className="shrink-0">{'\u2022'}</span>
                                        <input
                                            className="form-input flex-1 min-w-0"
                                            type="text"
                                            value={skillName}
                                            onChange={(e) =>
                                                handleSkillsNestedArrayChange(index, skillIndex, e.target.value)
                                            }
                                        />
                                    </li>
                                ))}
                                <li className="flex items-center gap-2 py-1">
                                    <span className="shrink-0">{'\u2022'}</span>
                                    <button
                                        type="button"
                                        className="creator-page-button"
                                        onClick={() => handleAddNestedArrayItem("skills", index, "skillName", "")}
                                    >
                                        +
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
                <button
                    className="creator-page-button"
                    onClick={() => handleAddArrayItem("skills", createEmptySkill())}
                >
                    Add Skill Category
                </button>
            </div>
            <div className="pb-5">
                <h1 className="section-header">Awards & Certifications</h1>
                {inputData.awardsCertification.map((awardCertification, index) => (
                    <div key={index} className="awards flex flex-col gap-2 py-1">
                        <label className="form-label">
                            <span className="form-label-text">Award / Certification</span>
                            <input
                                className="form-input"
                                type="text"
                                value={awardCertification.awardCertificationTitle}
                                onChange={(e) =>
                                    handleSectionArrayChange("awardsCertification", index, "awardCertificationTitle", e.target.value)
                                }
                            />
                        </label>
                    </div>
                ))}
                <button
                    className="creator-page-button"
                    onClick={() => handleAddArrayItem("awardsCertification", createEmptyAwardCertification())}
                >
                    Add Award/Certification
                </button>
            </div>
            <div className="pb-5">
                <h1 className="section-header">Extracurricular Activities (optional)</h1>
                {inputData.extracurricularActivities?.map((activity, index) => (
                    <div key={index} className="extracurricular flex flex-col gap-2 py-1">
                        <label className="form-label">
                            <span className="form-label-text">Activity</span>
                            <input
                                className="form-input"
                                type="text"
                                value={activity.activityName}
                                onChange={(e) =>
                                    handleSectionArrayChange("extracurricularActivities", index, "activityName", e.target.value)
                                }
                            />
                        </label>
                    </div>
                ))}
                <button
                    className="creator-page-button mt-5"
                    onClick={() => handleAddOptionalArrayItem("extracurricularActivities", createEmptyExtracurricularActivity())}
                >
                    Add Extracurricular Activity
                </button>
            </div>
            <div className="pb-5">
                <h1 className="section-header">Languages</h1>
                {inputData.languages.map((language, index) => (
                    <div key={index} className="languages flex flex-col gap-2 py-1">
                        <label className="form-label">
                            <span className="form-label-text">Language</span>
                            <input
                                className="form-input"
                                type="text"
                                value={language.languageName}
                                onChange={(e) =>
                                    handleSectionArrayChange("languages", index, "languageName", e.target.value)
                                }
                            />
                        </label>
                        <label className="form-label">
                            <span className="form-label-text">Proficiency</span>
                            <input
                                className="form-input"
                                type="text"
                                value={language.proficiencyLevel}
                                onChange={(e) =>
                                    handleSectionArrayChange("languages", index, "proficiencyLevel", e.target.value)
                                }
                            />
                        </label>
                    </div>
                ))}
                <button
                    className="creator-page-button"
                    onClick={() => handleAddArrayItem("languages", createEmptyLanguage())}
                >
                    Add Language
                </button>
            </div>
        </div>
    )
}
