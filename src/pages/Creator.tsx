import type { CreatorProps, ArraySection, ResumeData } from "../types/common";
import { TrashIcon } from "@phosphor-icons/react/dist/csr/Trash";

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

    const handleExperienceDurationChange = (
        index: number,
        dateField: "startDate" | "endDate" | "isCurrent",
        value: string | boolean
    ) => {
        setInputData(prev => ({
            ...prev,
            experience: prev.experience.map((experience, i) =>
                i === index
                    ? {
                        ...experience,
                        employmentDuration: {
                            ...experience.employmentDuration,
                            [dateField]: value
                        }
                    }
                    : experience
            )
        }));
    };

    const handleEducationDurationChange = (
        index: number,
        dateField: "startDate" | "endDate" | "isCurrent",
        value: string | boolean 
    ) => {
        setInputData(prev => ({
            ...prev,
            education: prev.education.map((education, i) =>
                i === index
                    ? {
                        ...education,
                        graduationDate: {
                            ...education.graduationDate,
                            [dateField]: value
                        }
                    }
                    : education
            )
        }))
    }

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

    const handleDeleteArrayItem = <Section extends ArraySection | "extracurricularActivities">(
        section: Section,
        index: number
    ) => {
        setInputData(prev => ({
            ...prev,
            [section]: prev[section]?.filter((_, i) => i !== index)
        }));
    };

    const handleDeleteNestedArrayItem = <Section extends "experience" | "projects" | "skills">(
        section: Section,
        itemIndex: number,
        field: Section extends "skills" ? "skillName" : "description",
        valueIndex: number
    ) => {
        setInputData(prev => ({
            ...prev,
            [section]: prev[section].map((item, i) => {
                if (i !== itemIndex) return item;
                const currentValues = item[field as keyof typeof item] as string[];
                return {
                    ...item,
                    [field]: currentValues.filter((_, j) => j !== valueIndex)
                };
            })
        }));
    };

    // helper functions to create empty items for each array section when adding new items
    const createEmptyExperience = (): ResumeData["experience"][number] => ({
        companyName: "",
        companyLocation: "",
        positionTitle: "",
        employmentDuration: {
            startDate:"", 
            endDate: "", 
            isCurrent: false
        },
        description: []
    });

    const createEmptyEducation = (): ResumeData["education"][number] => ({
        institutionName: "",
        location: "",
        courseOfStudy: "",
        cgpa: 0,
        graduationDate: {
            startDate:"", 
            endDate: "", 
            isCurrent: false
        }
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
    // type DateDurationFieldMap = {
    //     experience: "employmentDuration";
    //     education: "graduationDate";
    // };

    // const handleDateDurationChange = <
    //     Section extends keyof DateDurationFieldMap
    // >(
    //     section: Section,
    //     index: number,
    //     field: DateDurationFieldMap[Section],
    //     dateField: "startDate" | "endDate" | "isCurrent",
    //     value: string | boolean
    // ) => {
    //     setInputData(prev => ({
    //         ...prev,
    //         [section]: prev[section].map((item, i) => {
    //             if (i !== index) return item;

    //             const currentDuration = item[field as keyof typeof item] as {
    //                 startDate: string;
    //                 endDate: string;
    //                 isCurrent?: boolean;
    //             };

    //             return {
    //                 ...item,
    //                 [field]: {
    //                     ...currentDuration,
    //                     [dateField]: value
    //                 }
    //             };
    //         })
    //     }));
    // };

    return (
        <div className="creator-scroll-fade relative">
            <div className="max-h-280 flex flex-col divide-y gap-5 px-15 py-10 font-mono overflow-auto border-y border-current/5">
            <div className="pb-5">
                <h1 className="section-header">Header</h1>
                <div className="flex flex-col gap-3">
                    <label className="form-label">
                        <span className="form-label-text">Name</span>
                        <input className="form-input" name="name" type="text" autoComplete="on" placeholder="e.g. Tan Ah Kao" value={inputData.header.name} onChange={handleHeaderChange}/>
                    </label>
                    <label className="form-label">
                        <span className="form-label-text">Email</span>
                        <input className="form-input" name="email" type="email" autoComplete="on" placeholder="e.g. ahkao67@gmail.com" value={inputData.header.email} onChange={handleHeaderChange}/>
                    </label>
                    <label className="form-label">
                        <span className="form-label-text">Phone Number</span>
                        <input className="form-input" name="phoneNumber" id="tel" autoComplete="on" type="text" placeholder="e.g. +60123456789" value={inputData.header.phoneNumber} onChange={handleHeaderChange}/>
                    </label>
                    <label className="form-label">
                        <span className="form-label-text">Location</span>
                        <input className="form-input" name="location" type="text" autoComplete="on" placeholder="e.g. Klang, Selangor" value={inputData.header.location} onChange={handleHeaderChange}/>
                    </label>
                    <label className="form-label">
                        <span className="form-label-text">LinkedIn Profile (optional)</span>
                        <input className="form-input" name="linkedin" type="url" autoComplete="on" placeholder="e.g. linkedin.com/in/ahkaotan" value={inputData.header.linkedin} onChange={handleHeaderChange}/>
                    </label>
                </div>
            </div>
            <div className="pb-5">
                <h1 className="section-header">Summary (optional)</h1>
                <label className="flex flex-col gap-2 text-soft-black dark:text-soft-milk text-sm">
                    <textarea
                        className="form-input min-h-28 max-h-56 resize-y"
                        value={inputData.summary ?? ""}
                        onChange={handleSummaryChange}
                        maxLength={350}
                        placeholder="Max 350 characters."
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
                                placeholder="e.g. Apple Inc."
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
                                name="location"
                                value={experience.companyLocation}
                                autoComplete="on"  
                                placeholder="e.g. Klang, Selangor"
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
                                placeholder="e.g. Software Developer"
                                onChange={(e) =>
                                    handleSectionArrayChange("experience", index, "positionTitle", e.target.value)
                                }
                            />
                        </label>
                        <label className="form-label">
                            <span className="form-label-text">Start Date</span>
                            <input 
                                className="form-input" 
                                type="month"
                                value={experience.employmentDuration.startDate}
                                onChange={(e) =>
                                    handleExperienceDurationChange(index, "startDate", e.target.value)
                                } 
                            />
                        </label>
                        <label className="form-label">
                            <span className="form-label-text">End Date</span>
                            <input 
                                className="form-input" 
                                type="month"
                                value={experience.employmentDuration.endDate}
                                onChange={(e) =>
                                    handleExperienceDurationChange(index, "endDate", e.target.value)
                                } 
                            />
                        </label>
                        <label className="form-label">
                            <span className="form-label-text">Currently work here?</span>
                            <input 
                                className="" 
                                type="checkbox"
                                checked={experience.employmentDuration.isCurrent}
                                onChange={(e) =>
                                    handleExperienceDurationChange(index, "isCurrent", e.target.checked)
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
                                        <button 
                                            className="transition-colors hover:text-red-500 hover:-translate-y-0.5"
                                            onClick={() => handleDeleteNestedArrayItem("experience", index, "description", descIndex)}
                                        >
                                            <TrashIcon size={24} />
                                        </button>
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
                        <button 
                            className="creator-page-button my-0 mb-3 flex items-center justify-center transition-colors hover:text-red-600"
                            onClick={() => handleDeleteArrayItem("experience", index)}
                        >
                            <span>Delete Experience?</span>
                        </button>
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
                    <div key={index} className="education flex flex-col gap-3 pb-3">
                        <label className="form-label">
                            <span className="form-label-text">Institution Name</span>
                            <input
                                className="form-input"
                                type="text"
                                value={education.institutionName}
                                placeholder="e.g. Universiti Tak Ada Rehat"
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
                                name="location"
                                value={education.location}
                                autoComplete="on"
                                placeholder="e.g. Klang, Selangor"
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
                                placeholder="e.g. Bachelor of Computer Science"
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
                                placeholder="0.00 - 5.00"
                                onChange={(e) =>
                                    handleSectionArrayChange("education", index, "cgpa", Number(e.target.value))
                                }
                            />
                        </label>
                        <label className="form-label">
                            <span className="form-label-text">Start Date</span>
                            <input
                                className="form-input"
                                type="month"
                                value={education.graduationDate.startDate}
                                onChange={(e) =>
                                    handleEducationDurationChange(index, "startDate", e.target.value)
                                }
                            />
                        </label>
                        {!education.graduationDate.isCurrent 
                            ? (
                                <label className="form-label">
                                    <span className="form-label-text">End Date</span>
                                    <input
                                        className="form-input"
                                        type="month"
                                        value={education.graduationDate.endDate}
                                        onChange={(e) =>
                                            handleEducationDurationChange(index, "endDate", e.target.value)
                                        }
                                    />
                                </label>
                            )
                            : undefined
                        }
                        <label className="form-label">
                            <span className="form-label-text">Currently study here?</span>
                            <input
                                className=""
                                type="checkbox"
                                checked={education.graduationDate.isCurrent}
                                onChange={(e) =>
                                    handleEducationDurationChange(index, "isCurrent", e.target.checked)
                                }
                            />
                        </label>
                        <button 
                            className="creator-page-button my-0 mb-3 flex items-center justify-center transition-colors hover:text-red-600 active:text-red-600 focus-visible:text-red-600"
                            onClick={() => handleDeleteArrayItem("experience", index)}
                        >
                            <span>Delete Education?</span>
                        </button>
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
                    <div key={index} className="projects flex flex-col gap-3 pb-3">
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
                                        <button 
                                            className="transition-colors hover:text-red-500 hover:-translate-y-0.5"
                                            onClick={() => handleDeleteNestedArrayItem("projects", index, "description", descIndex)}
                                        >
                                            <TrashIcon size={24} />
                                        </button>
                                    </li>
                                ))}
                                <li className="flex items-center gap-2 py-1">
                                    <span className="shrink-0">{'\u2022'}</span>
                                    <button
                                        type="button"
                                        className="creator-page-button mt-0"
                                        onClick={() => handleAddNestedArrayItem("projects", index, "description", "")}
                                    >
                                        +
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <button 
                            className="creator-page-button my-0 mb-3 flex items-center justify-center transition-colors hover:text-red-600"
                            onClick={() => handleDeleteArrayItem("projects", index)}
                        >
                            <span>Delete Project?</span>
                        </button>
                    </div>
                ))}
                <button
                    className="creator-page-button mt-0"
                    onClick={() => handleAddArrayItem("projects", createEmptyProject())}
                >
                    Add Project
                </button>
            </div>
            <div className="pb-5">                
                <h1 className="section-header">Technical Skills</h1>
                {inputData.skills.map((skill, index) => (
                    <div key={index} className="skills flex flex-col gap-3 pb-3">
                        <label className="form-label">
                            <span className="form-label-text">Skill Category</span>
                            <input
                                className="form-input"
                                type="text"
                                value={skill.skillCategory}
                                placeholder="e.g. Programming Languages, Frameworks, Tools, etc."
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
                                        <button 
                                            className="transition-colors hover:text-red-500 hover:-translate-y-0.5"
                                            onClick={() => handleDeleteNestedArrayItem("skills", index, "skillName", skillIndex)}
                                        >
                                            <TrashIcon size={24} />
                                        </button>
                                    </li>
                                ))}
                                <li className="flex items-center gap-2 py-1">
                                    <span className="shrink-0">{'\u2022'}</span>
                                    <button
                                        type="button"
                                        className="creator-page-button m-0"
                                        onClick={() => handleAddNestedArrayItem("skills", index, "skillName", "")}
                                    >
                                        +
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <button 
                            className="creator-page-button my-0 mb-3 flex items-center justify-center transition-colors hover:text-red-600"
                            onClick={() => handleDeleteArrayItem("skills", index)}
                        >
                            <span>Delete Skill Category?</span>
                        </button>
                    </div>
                ))}
                <button
                    className="creator-page-button mt-0"
                    onClick={() => handleAddArrayItem("skills", createEmptySkill())}
                >
                    Add Skill Category
                </button>
            </div>
            <div className="pb-5">
                <h1 className="section-header">Awards & Certifications</h1>
                {inputData.awardsCertification.map((awardCertification, index) => (
                    <div key={index} className="flex flex-col gap-3 pb-3">
                        <label className="flex items-center gap-2">
                            <span className="shrink-0">{'\u2022'}</span>
                            <input
                                className="form-input flex-1 min-w-0"
                                type="text"
                                value={awardCertification.awardCertificationTitle}
                                placeholder="e.g. Google XXX Certificate (year)"
                                onChange={(e) =>
                                    handleSectionArrayChange("awardsCertification", index, "awardCertificationTitle", e.target.value)
                                }
                            />
                            <button 
                                className="transition-colors hover:text-red-500 hover:-translate-y-0.5"
                                onClick={() => handleDeleteArrayItem("awardsCertification", index)}
                            >
                                <TrashIcon size={24} />
                            </button>
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
                    <div key={index} className="flex flex-col gap-3 pb-3">
                        <label className="flex items-center gap-2">
                            <span className="shrink-0">{'\u2022'}</span>
                            <input
                                className="form-input flex-1 min-w-0"
                                type="text"
                                value={activity.activityName}
                                placeholder="e.g. XX Committee of YY (year)"
                                onChange={(e) =>
                                    handleSectionArrayChange("extracurricularActivities", index, "activityName", e.target.value)
                                }
                            />
                            <button 
                                className="transition-colors hover:text-red-500 hover:-translate-y-0.5"
                                onClick={() => handleDeleteArrayItem("extracurricularActivities", index)}
                            >
                                <TrashIcon size={24} />
                            </button>
                        </label>
                    </div>
                ))}
                <button
                    className="creator-page-button"
                    onClick={() => handleAddOptionalArrayItem("extracurricularActivities", createEmptyExtracurricularActivity())}
                >
                    Add Extracurricular Activity
                </button>
            </div>
            <div className="pb-5">
                <h1 className="section-header">Languages</h1>
                {inputData.languages.map((language, index) => (
                    <div key={index} className="flex flex-col gap-2 py-3">
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
                        <button 
                            className="creator-page-button my-0 mb-3 flex items-center justify-center transition-colors hover:text-red-600"
                            onClick={() => handleDeleteArrayItem("languages", index)}
                        >
                            <span>Delete Language?</span>
                        </button>
                    </div>
                ))}
                <button
                    className="creator-page-button mt-0"
                    onClick={() => handleAddArrayItem("languages", createEmptyLanguage())}
                >
                    Add Language
                </button>
            </div>
            </div>
        </div>
    )
}
