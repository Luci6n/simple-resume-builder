import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const savedTheme = localStorage.getItem("theme");

const shouldUseDarkMode = savedTheme ?
  savedTheme === "dark" :
  window.matchMedia("(prefers-color-scheme: dark)").matches;

document.documentElement.classList.toggle("dark", shouldUseDarkMode)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
