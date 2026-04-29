export default function Creator() {
    return (
        <div className="flex flex-col">
            <div className="header flex flex-col">
                <h1>Header</h1>
                <label>
                    <span>Name</span>
                    <input type="text" />
                </label>
                <label>
                    <span>Email</span>
                    <input type="email" required />
                </label>
                <label>
                    <span>Phone Number</span>
                    <input type="text" />
                </label>
                <label>
                    <span>Location</span>
                    <input type="text" />
                </label>
                <label>
                    <span>LinkedIn Profile Link (optional)</span>
                    <input type="text" />
                </label>
            </div>
            <hr />
            <div className="experience flex flex-col">
                <h1>Experience</h1>
                <label>
                    <span>Company Name</span>
                    <input type="text" />
                </label>
                <label>
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
                <label>
                    <span>Institution Name</span>
                    <input type="text" />
                </label>
                <label>
                    <span>Location</span>
                    <input type="month" />
                </label>
                <label>
                    <span>Course of Study</span>
                    <input type="month" />
                </label>
                <label>
                    <span>CGPA</span>
                    <input type="month" />
                </label>
                <label>
                    <span>Employment duration</span>
                    <input type="month" />
                </label>
            </div>
            <div className="projects flex flex-col">
                <h1>Projects</h1>
                <label>
                    <span>Project Title</span>
                    <input type="text" />
                </label>
                <span>Description</span>
                <ul>
                    <li><input type="text"/></li>
                </ul>
            </div>
            <div className="skills flex flex-col">
                <h1>Technical Skills</h1>
                <label>
                    <span>Skill Category</span>
                    <input type="text" />
                </label>
                <span>Choose Skill</span>
                <ul>
                    <li><input type="text"/></li>
                </ul>
            </div>
            <div className="awards flex flex-col">
                <h1>Awards & Certifications</h1>
                <label>
                    <span>Awards / Certification</span>
                    <input type="text" />
                </label>
            </div>
            <div className="extracurricular flex flex-col">
                <h1>Extracurricular Activities</h1>
                <label>
                    <span>Extracurricular Activities</span>
                    <input type="text" />
                </label>
            </div>
            <div className="languages flex flex-col">
                <h1>Languages</h1>
                <label>
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