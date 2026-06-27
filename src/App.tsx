import Creator from "./pages/Creator.tsx"
import Preview from "./pages/Preview.tsx"
import { useEffect, useState } from "react"
import type { ResumeData } from "./types/common.ts";
import { sampleData } from "./data/resumeData.ts";
import { normalizeResumeData } from "./utils/sectionLayout.ts";
import { resolveInitialTheme, setStoredTheme } from "./utils/theme.ts";

function App() {
  const [inputData, setInputData] = useState<ResumeData>(() => {
    let savedData: string | null;

    try {
      savedData = localStorage.getItem("resumeData");
    } catch {
      savedData = null;
    }

    if(savedData) {
      try {
        const parsedData = JSON.parse(savedData) as ResumeData;

        if(parsedData && typeof parsedData === "object" && "header" in parsedData) {
          return normalizeResumeData(parsedData);
        }

        console.warn("Saved resume data is invalid. Using default data.");
      } catch (error) {
        console.warn("Error parsing saved resume data. Using default data.", error);
      }
    }

    return normalizeResumeData(sampleData);
    // To start with an empty form instead, import blankData and return it here.
  });
  const [isReverseToggled, setIsReverseToggled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => resolveInitialTheme() === "dark")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  },[isDarkMode])

  useEffect(() => {
    try {
      localStorage.setItem("resumeData", JSON.stringify(inputData));
    } catch {
      console.warn("Resume data could not be saved to local storage.");
    }
  }, [inputData])
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    setStoredTheme(newMode ? "dark" : "light");
  }
  const printResume = () => {
      window.print();
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-soft-milk dark:bg-deep-charcoal text-soft-black dark:text-soft-milk transition-colors duration-200">
      <main className="flex flex-col items-center gap-10 py-8">
        <section className="flex w-full max-w-300 flex-col gap-5 px-6 text-center">
          <h1 className="text-5xl text-shadow-lg">Simple Resume Builder</h1>
          <p className="text-shadow-md">A simple ATS-friendly resume builder. Fill in the information and download the resume with your desired file format.</p>
          <section className="flex flex-row flex-wrap justify-center gap-4">
            <button className="app-action-button" onClick={() => setIsReverseToggled(prev => !prev)}>
              Reverse Layout
            </button>
            <button className="app-action-button" onClick={toggleDarkMode}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button 
              className="app-action-button w-52" 
              onClick={printResume}
            >
              Save as PDF
            </button>
          </section>
        </section>
        <section className="w-full overflow-x-auto px-4 pb-8">
          <div className={`mx-auto grid w-full max-w-370 grid-cols-1 ${isReverseToggled ? "xl:grid-cols-[210mm_minmax(360px,520px)]" : "xl:grid-cols-[minmax(360px,520px)_210mm]"} items-start justify-center gap-10 xl:gap-16`}>
            {isReverseToggled ? (
              <>
                <div className="w-full overflow-x-auto">
                  <div className="resume-print-area w-[210mm]">
                    <Preview inputData={inputData}/>
                  </div>
                </div>
                <div className="mx-auto w-full max-w-[520px] xl:max-h-500">
                  <Creator inputData={inputData} setInputData={setInputData} />
                </div>
              </>
            ) : (
              <>
                <div className="mx-auto w-full max-w-[520px] xl:max-h-500">
                  <Creator inputData={inputData} setInputData={setInputData} />
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="resume-print-area w-[210mm]">
                    <Preview inputData={inputData}/>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
