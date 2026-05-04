import type { PreviewProps } from "../types/common";

export default function Preview({ inputData }: PreviewProps) {
    const formatMonthYear = (value: string) => {
        if (!value) return "";

        const [year, month] = value.split("-");
        const date = new Date(Number(year), Number(month) - 1);

        return date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric"
        });
    };

    return (
        <>
            <h1 className="section-header">Resume Preview</h1>
            <div className="resume-page">
                <div className="flex flex-col">
                    <span className="form-label-text text-center text-[19px]">{inputData.header.name}</span>
                    <div className="flex flex-row divide-x justify-center">
                        <span className="pr-1 text-[15px]">{inputData.header.email}</span>
                        <span className="px-1 text-[15px]">{inputData.header.phoneNumber}</span>
                        <span className="px-1 text-[15px]">{inputData.header.location}</span>
                        <span className="pl-1 text-[15px]">{inputData.header.linkedin ?? undefined}</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-base font-bold border-b uppercase">Summary</h1>
                    <p className="text-[15px] text-justify">{inputData.summary}</p>
                </div>
                <div className="experience flex flex-col">
                    <h1 className="text-base font-bold border-b uppercase">Experience</h1>
                    {inputData.experience.map((experience, index) => (
                        <div key={index}>
                            <div className="flex justify-between">
                                <span className="font-bold text-[15px]">{experience.companyName}</span>
                                <span className="text-[15px]">{experience.companyLocation}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[15px]">{experience.positionTitle}</span>
                                <span className="text-[15px]">{formatMonthYear(experience.employmentDuration.startDate) + " - " + formatMonthYear(experience.employmentDuration.endDate)}</span>
                            </div>
                            <ul className="list-disc list-outside pl-5">
                                {experience.description.map((description, descIndex) => (
                                    <li key={descIndex} className="text-[15px]">{description}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="education flex flex-col">
                    <h1 className="text-base font-bold border-b uppercase">Education</h1>
                    {inputData.education.map((education, index) => (
                        <div key={index}>
                            <div className="flex justify-between">
                                <span className="font-bold text-[15px]">{education.institutionName}</span>
                            </div>
                            <div className="flex justify-between ">
                                <div className="flex gap-1">
                                    <span className="text-[15px]">{education.courseOfStudy};</span>
                                    <span className="font-bold text-[15px]">CGPA:{education.cgpa}</span>
                                </div>
                                <span className="text-[15px]">{formatMonthYear(education.graduationDate.startDate) + " - " + formatMonthYear(education.graduationDate.endDate)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="projects flex flex-col">
                    <h1 className="text-base font-bold border-b uppercase">Projects</h1>
                    {inputData.projects.map((project, index) => (
                        <div key={index}>
                            <span className="font-bold text-[15px]">{project.projectName}</span>
                            <ul className="list-disc list-outside pl-5">
                                {project.description.map((description, descIndex) => (
                                    <li key={descIndex} className="text-[15px]">{description}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="skills flex flex-col">
                    <h1 className="text-base font-bold border-b uppercase">Technical Skills</h1>
                    {inputData.skills.map((skill, index) => (
                        <div key={index} className="flex gap-1">
                            <span className="font-bold text-[15px]">{skill.skillCategory}:</span>
                            <span className="text-[15px]">{skill.skillName.join(", ")}</span>
                        </div>
                    ))}
                </div>
                <div className="awards flex flex-col">
                    <h1 className="text-base font-bold border-b uppercase">Awards & Certifications</h1>
                    <ul className="list-disc list-outside pl-5">
                        {inputData.awardsCertification.map((award, index) => (
                            <li key={index} className="text-[15px]">{award.awardCertificationTitle}</li>
                        ))}
                    </ul>
                </div>
                <div className="extracurricular flex flex-col">
                    <h1 className="text-base font-bold border-b uppercase">Extracurricular Activities (optional)</h1>
                    <ul className="list-disc list-outside pl-5">
                        {inputData.extracurricularActivities?.map((activity, index) => (
                            <li key={index} className="text-[15px]">{activity.activityName}</li>
                        ))}
                    </ul>
                </div>
                <div className="languages flex flex-col">
                    <h1 className="text-base font-bold border-b uppercase">Languages</h1>
                    {inputData.languages.map((language, index) => (
                        <div key={index} className="flex gap-1">
                            <span className="font-bold text-[15px]">{language.languageName}:</span>
                            <span className="text-[15px]">{language.proficiencyLevel}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
