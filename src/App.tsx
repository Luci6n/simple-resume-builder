import Creator from "./pages/Creator.tsx"
import Preview from "./pages/Preview.tsx"
import { useEffect, useState } from "react"

function App() {
  const [isReverseToggled, setIsReverseToggled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    console.log(savedTheme)

    if(savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  },[isDarkMode])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    localStorage.setItem("theme", newMode ? "dark" : "light");
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-soft-milk dark:bg-soft-black text-black dark:text-white">
      <main className="flex flex-col gap-10 py-8">
        <section className="flex flex-col gap-5 text-center">
          <h1 className="text-5xl">Simple Resume Builder</h1>
          <p className="">A simple ATS-friendly resume builder. Fill in the information and download the resume with your desired file format.</p>
          <section className="flex flex-row justify-center">
            <button className="m-5 w-40 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsReverseToggled(prev => !prev)}>
              Reverse Layout
            </button>
            <button className="m-5 w-40 bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleDarkMode}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </section>
        </section>
        <section className={`flex ${isReverseToggled ? "flex-row-reverse" : "flex-row"} justify-center gap-50`}>
          <Creator />
          <Preview />
        </section>
      </main>
    </div>
  )
}

export default App
