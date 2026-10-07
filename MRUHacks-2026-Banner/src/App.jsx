import { useState } from 'react'
import Aurora from './components/Aurora'
import bannerImage from './assets/MRUHacks2026BannerBlack.png'
import bannerImageWhite from './assets/MRUHacks2026BannerWhite.png'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <main className="app-shell">
      <Aurora
        colorStops={["#FADF4B", "#D841A1", "#93FFFF"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
        lightMode={!darkMode}
      />
      <img className="banner-image" src={darkMode ? bannerImageWhite : bannerImage} alt="MRUHacks 2026" />
      <button
        className="theme-toggle"
        type="button"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={darkMode}
        onClick={() => setDarkMode(mode => !mode)}
      >
        {darkMode ? '☀' : '☾'}
      </button>
    </main>
  )
}

export default App
