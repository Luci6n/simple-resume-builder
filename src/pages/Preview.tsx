import type { PreviewProps } from "../types/common";

export default function Preview({ inputData }: PreviewProps) {
    const formatMonthYear = (value: string) => {
        if (!value) return "";

        const [year, month] = value.split("-");
        const date = new Date(Number(year), Number(month) - 1);

        return date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        });
    };

    return (
        <>
            <h1 className="section-header">Resume Preview</h1>
            <div className="resume-page flex flex-col gap-5 border border-current/20 rounded-md shadow-lg/50">
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
                                <span className="text-[15px]">{formatMonthYear(experience.employmentDuration)}</span>
                            </div>
                            <ul>
                                {experience.description.map((description, descIndex) => (
                                    <li key={descIndex}>{'\u2022'} {description}</li>
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
                                <span className="font-bold text-[15px]">{education.institutionName} - {education.courseOfStudy}</span>
                                <span className="text-[15px]">{formatMonthYear(education.graduationDate)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[15px]">{education.location}</span>
                                <span className="text-[15px]">CGPA: {education.cgpa}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="projects flex flex-col gap-1">
                    <h1 className="text-base font-bold border-b uppercase">Projects</h1>
                    <label className="flex flex-row gap-2">
                        <span>Project Title</span>
                        <input type="text" />
                    </label>
                    <span>Description</span>
                    <ul>
                        <li></li>
                    </ul>
                </div>
                <div className="skills flex flex-col gap-1">
                    <h1 className="text-base font-bold border-b uppercase">Technical Skills</h1>
                    <label className="flex flex-row gap-2">
                        <span>Skill Category</span>
                    </label>
                    <span>Skill</span>
                    <ul>
                        <li></li>
                    </ul>
                </div>
                <div className="awards flex flex-col gap-1">
                    <h1 className="text-base font-bold border-b uppercase">Awards & Certifications</h1>
                    <label className="flex flex-row gap-2">
                        <span>Awards / Certification</span>
                    </label>
                </div>
                <div className="extracurricular flex flex-col gap-1">
                    <h1 className="text-base font-bold border-b uppercase">Extracurricular Activities (optional)</h1>
                </div>
                <div className="languages flex flex-col gap-1">
                    <h1 className="text-base font-bold border-b uppercase">Languages</h1>
                    <label className="flex flex-row gap-2">
                        <span>Select Language</span>
                        <select name="language" id="language">
                            <option value="english">English</option>
                            <option value="spanish">Chinese</option>
                            <option value="malay">Malay</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>
            </div>
        </>
    )
}
