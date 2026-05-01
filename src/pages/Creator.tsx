import type { CreatorProps, ArraySection, ResumeData } from "../types/common";
import "react-datepicker/dist/react-datepicker.css";

export default function Creator({ inputData, setInputData }: CreatorProps) {
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

    const createEmptyExperience = (): ResumeData["experience"][number] => ({
        companyName: "",
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
        <div className="flex flex-col gap-5 px-20 py-5 border-2 font-mono">
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
            <hr />
            <h1 className="section-header">Experience</h1>
            {inputData.experience.map((experience, index) => (
                <div key={index} className="experience flex flex-col gap-3">
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
                                </li>
                            ))}
                            <li className="flex items-center gap-2 py-1">
                                <span className="shrink-0">{'\u2022'}</span>
                                <button 
                                    type="button"
                                    className="flex-1 border-2 rounded-sm shadow-amber-200 inset-shadow-zinc-900"
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
                className="border-2 rounded-sm shadow-amber-200 inset-shadow-zinc-900"
                onClick={() => handleAddArrayItem("experience", createEmptyExperience())}
            >
                    Add Experience
            </button>
            <hr />
            <h1 className="section-header">Education</h1>
            {inputData.education.map((education, index) => (
                <div key={index} className="education flex flex-col gap-3">
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
                className="border-2 rounded-sm shadow-amber-200 inset-shadow-zinc-900"
                onClick={() => handleAddArrayItem("education", createEmptyEducation())}
            >
                Add Education
            </button>
            <hr />
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
                                    className="flex-1 border-2 rounded-sm shadow-amber-200 inset-shadow-zinc-900"
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
                className="border-2 rounded-sm shadow-amber-200 inset-shadow-zinc-900"
                onClick={() => handleAddArrayItem("projects", createEmptyProject())}
            >
                Add Project
            </button>
            <hr />
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
                                    className="flex-1 border-2 rounded-sm shadow-amber-200 inset-shadow-zinc-900"
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
                className="border-2 rounded-sm shadow-amber-200 inset-shadow-zinc-900"
                onClick={() => handleAddArrayItem("skills", createEmptySkill())}
            >
                Add Skill Category
            </button>
            <hr />
            <h1 className="section-header">Awards & Certifications</h1>
            {inputData.awardsCertification.map((awardCertification, index) => (
                <div key={index} className="awards flex flex-col gap-3">
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
                className="border-2 rounded-sm shadow-amber-200 inset-shadow-zinc-900"
                onClick={() => handleAddArrayItem("awardsCertification", createEmptyAwardCertification())}
            >
                Add Award/Certification
            </button>
            <hr />
            <h1 className="section-header">Extracurricular Activities (optional)</h1>
            {inputData.extracurricularActivities?.map((activity, index) => (
                <div key={index} className="extracurricular flex flex-col gap-3">
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
                className="border-2 rounded-sm shadow-amber-200 inset-shadow-zinc-900"
                onClick={() => handleAddOptionalArrayItem("extracurricularActivities", createEmptyExtracurricularActivity())}
            >
                Add Extracurricular Activity
            </button>
            <hr />
            <h1 className="section-header">Languages</h1>
            {inputData.languages.map((language, index) => (
                <div key={index} className="languages flex flex-col gap-3">
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
                className="border-2 rounded-sm shadow-amber-200 inset-shadow-zinc-900"
                onClick={() => handleAddArrayItem("languages", createEmptyLanguage())}
            >
                Add Language
            </button>
        </div>
    )
}
