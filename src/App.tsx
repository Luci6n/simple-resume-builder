import Creator from "./pages/Creator.tsx"
import Preview from "./pages/Preview.tsx"
import { useEffect, useState } from "react"
import type { ResumeData } from "./types/common.ts";
import { resumeData } from "./data/resumeData.ts";

function App() {
  const [inputData, setInputData] = useState<ResumeData>(() => {
    const savedData = localStorage.getItem("resumeData");

    if(savedData) {
      try {
        const parsedData = JSON.parse(savedData) as ResumeData;

        if(parsedData && typeof parsedData === "object" && "header" in parsedData) {
          return parsedData;
        }

        console.warn("Saved resume data is invalid. Using default data.");
      } catch (error) {
        console.warn("Error parsing saved resume data. Using default data.", error);
      }
    }

    return resumeData;
    // To start with an empty form instead, import blankData and return it here.
  });
  const [isReverseToggled, setIsReverseToggled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if(savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  },[isDarkMode])

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(inputData));
  }, [inputData])
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    localStorage.setItem("theme", newMode ? "dark" : "light");
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-soft-milk dark:bg-deep-charcoal text-black dark:text-white">
      <main className="flex flex-col gap-10 py-8">
        <section className="flex flex-col gap-5 text-center">
          <h1 className="text-5xl text-shadow-lg">Simple Resume Builder</h1>
          <p className="text-shadow-md">A simple ATS-friendly resume builder. Fill in the information and download the resume with your desired file format.</p>
          <section className="flex flex-row justify-center gap-10">
            <button className="w-40 self-start bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 active:bg-blue-600" onClick={() => setIsReverseToggled(prev => !prev)}>
              Reverse Layout
            </button>
            <div className="flex w-64 flex-col items-center gap-2">
              <button className="w-40 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 active:bg-blue-600" onClick={toggleDarkMode}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <p className="text-[10px] leading-tight">
                ps: dark mode not really styled yet, use with caution :D
              </p>
            </div>
          </section>
        </section>
        <section className="grid grid-cols-9 gap-20 w-full max-w-500 px-10 items-center">
          <div className={`max-h-500 col-span-4 ${isReverseToggled ? "order-2" : "order-1"}`}>
            <Creator inputData={inputData} setInputData={setInputData} />
          </div>

          <div className={`w-[210mm] col-span-5 ${isReverseToggled ? "order-1" : "order-2"}`}>
            <Preview inputData={inputData} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
