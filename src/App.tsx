import Creator from "./pages/Creator.tsx"
import Preview from "./pages/Preview.tsx"
import { useState } from "react"

function App() {
  const [isReverseToggled, setIsReverseToggled] = useState(false)
  return (
    <body>
      <main>
        <button className="m-5 max-w-300 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsReverseToggled(prev => !prev)}>
          Reverse Layout
        </button>
        <section style={{ display: "flex", flexDirection: isReverseToggled ? "row-reverse" : "row" }}>
          <Creator />
          <Preview />
        </section>
      </main>
    </body>
  )
}

export default App
