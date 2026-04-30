import type ResumeData from "../types/common";

export default function Preview() {
    return (
        <div className="flex flex-col">
            <div className="header flex flex-col">
                <h1>Header</h1>
                <label className="flex flex-row gap-2">
                    <span>Name</span>
                    <input type="text" />
                </label>
                <label className="flex flex-row gap-2">
                    <span>Email</span>
                    <input type="email" required />
                </label>
                <label className="flex flex-row gap-2">
                    <span>Phone Number</span>
                    <input type="text" />
                </label>
                <label className="flex flex-row gap-2">
                    <span>Location</span>
                    <input type="text" />
                </label>
                <label className="flex flex-row gap-2">
                    <span>LinkedIn Profile Link (optional)</span>
                    <input type="text" />
                </label>
            </div>
            <hr />
            <div className="experience flex flex-col">
                <h1>Experience</h1>
                <label className="flex flex-row gap-2">
                    <span>Company Name</span>
                    <input type="text" />
                </label>
                <label className="flex flex-row gap-2">
                    <span>Employment duration</span>
                    <input type="month" />
                </label>
                <span>Description</span>
                <ul>
                    <li><input type="text"/></li>
                </ul>
            </div>
            <hr />
            <div className="education flex flex-col">
                <h1>Education</h1>
                <label className="flex flex-row gap-2">
                    <span>Institution Name</span>
                    <input type="text" />
                </label>
                <label className="flex flex-row gap-2">
                    <span>Location</span>
                    <input type="month" />
                </label>
                <label className="flex flex-row gap-2">
                    <span>Course of Study</span>
                    <input type="month" />
                </label>
                <label className="flex flex-row gap-2">
                    <span>CGPA</span>
                    <input type="month" />
                </label>
                <label className="flex flex-row gap-2">
                    <span>Employment duration</span>
                    <input type="month" />
                </label>
            </div>
            <hr />
            <div className="projects flex flex-col">
                <h1>Projects</h1>
                <label className="flex flex-row gap-2">
                    <span>Project Title</span>
                    <input type="text" />
                </label>
                <span>Description</span>
                <ul>
                    <li><input type="text"/></li>
                </ul>
            </div>
            <hr />
            <div className="skills flex flex-col">
                <h1>Technical Skills</h1>
                <label className="flex flex-row gap-2">
                    <span>Skill Category</span>
                    <input type="text" />
                </label>
                <span>Choose Skill</span>
                <ul>
                    <li><input type="text"/></li>
                </ul>
            </div>
            <hr />
            <div className="awards flex flex-col">
                <h1>Awards & Certifications</h1>
                <label className="flex flex-row gap-2">
                    <span>Awards / Certification</span>
                    <input type="text" />
                </label>
            </div>
            <hr />
            <div className="extracurricular flex flex-col">
                <h1>Extracurricular Activities (optional)</h1>
                <input type="text" placeholder="Enter extracurricular activities"/>
            </div>
            <hr />
            <div className="languages flex flex-col">
                <h1>Languages</h1>
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
    )
}