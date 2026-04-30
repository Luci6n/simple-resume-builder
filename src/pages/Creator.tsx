import { useState } from "react";
import DatePicker from "react-datepicker";
import type ResumeData from "../types/common";
import { resumeData } from "../data/resumeData";
import "react-datepicker/dist/react-datepicker.css";

export default function Creator() {
    const [inputData, setInputData] = useState<ResumeData>(resumeData);
    const [savedData, setSavedData] = useState<ResumeData>();

    const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value)
        setInputData(prev => ({
            ...prev,
            header:{
                ...prev?.header,
                [name]: value
            }
        }))
    }

    const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    }
    
    const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    }
    
    const handleProjectsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    }
    
    const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    }
    
    const handleAwardsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    }
    
    const handleExtracurricularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    }
    
    const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    }

    return (
        <div className="flex flex-col gap-5 mx-20 px-20 py-5 border-2">
            <h1 className="section-header">Header</h1>
            <div className="flex flex-col gap-2">
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
            <div className="experience flex flex-col gap-1">
                <h1 className="section-header">Experience</h1>
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
                    <li>{'\u2022'}<input type="text"/></li>
                </ul>
                <button className="border-2 shadow-amber-200 inset-shadow-zinc-900">Add Company</button>
            </div>
            <hr />
            <div className="education flex flex-col gap-1">
                <h1 className="section-header">Education</h1>
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
                    <span>Study duration</span>
                    <input type="month" />
                </label>
                <button>Add Education</button>
            </div>
            <hr />
            <div className="projects flex flex-col gap-1">
                <h1 className="section-header">Projects</h1>
                <label className="flex flex-row gap-2">
                    <span>Project Title</span>
                    <input type="text" />
                </label>
                <span>Description</span>
                <ul>
                    <li><input type="text"/></li>
                </ul>
                <button onClick={() => console.log('add porject')}>Add Project</button>
            </div>
            <hr />
            <div className="skills flex flex-col gap-1">
                <h1 className="section-header">Technical Skills</h1>
                <label className="flex flex-row gap-2">
                    <span>Skill Category</span>
                    <input type="text" />
                </label>
                <span>Skill</span>
                <ul>
                    <li><input type="text"/></li>
                </ul>
                <button onClick={() => console.log('add skill')}>Add Skill</button>
                <button onClick={() => console.log('add skill category')}>Add Skill Category</button>
            </div>
            <hr />
            <div className="awards flex flex-col gap-1">
                <h1 className="section-header">Awards & Certifications</h1>
                <label className="flex flex-row gap-2">
                    <span>Awards / Certification</span>
                    <input type="text" />
                </label>
                <button onClick={() => console.log('add award/certification')}>Add Award/Certification</button>
            </div>
            <hr />
            <div className="extracurricular flex flex-col gap-1">
                <h1 className="section-header">Extracurricular Activities (optional)</h1>
                <input type="text" placeholder="Enter extracurricular activities"/>
                <button onClick={() => console.log('add extracurricular activity')}>Add Extracurricular Activity</button>
            </div>
            <hr />
            <div className="languages flex flex-col gap-1">
                <h1 className="section-header">Languages</h1>
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
