import { useEffect, useState } from 'react'
import Aurora from './components/Aurora'
import bannerImage from './assets/MRUHacks2026BannerBlack.png'
import bannerImageWhite from './assets/MRUHacks2026BannerWhite.png'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [clockVisible, setClockVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => new Date())

  useEffect(() => {
    if (!clockVisible) return undefined
    const interval = window.setInterval(() => setCurrentTime(new Date()), 60000)
    return () => window.clearInterval(interval)
  }, [clockVisible])

  const time = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Edmonton',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(currentTime)
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Edmonton',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(currentTime)

  return (
    <main className="app-shell">
      <Aurora
        colorStops={["#FADF4B", "#D841A1", "#93FFFF"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
        lightMode={!darkMode}
      />
      <img
        className={`banner-image ${darkMode ? 'banner-image-hidden' : ''}`}
        src={bannerImage}
        alt="MRUHacks 2026"
      />
      <img
        className={`banner-image ${darkMode ? '' : 'banner-image-hidden'}`}
        src={bannerImageWhite}
        alt=""
        aria-hidden="true"
      />
      {clockVisible && (
        <section className={`clock-panel ${darkMode ? 'clock-panel-dark' : ''}`} aria-label="Edmonton time">
          <time className="clock-time">{time}</time>
          <span className="clock-date">{date}</span>
        </section>
      )}
      <button
        className="clock-toggle"
        type="button"
        aria-label={clockVisible ? 'Hide clock' : 'Show clock'}
        aria-pressed={clockVisible}
        onClick={() => setClockVisible(visible => !visible)}
      >
        {clockVisible ? '×' : '◷'}
      </button>
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
