import { useEffect, useState } from 'react'
import Aurora from './components/Aurora'
import bannerImage from './assets/MRUHacks2026BannerBlack.png'
import bannerImageWhite from './assets/MRUHacks2026BannerWhite.png'
import eventsCsv from './assets/Event.csv?raw'
import { formatEventTime, getVisibleEvents, parseSchedule } from './utils/schedule'
import './App.css'

const events = parseSchedule(eventsCsv)

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [clockVisible, setClockVisible] = useState(false)
  // const [currentTime, setCurrentTime] = useState(() => new Date())
const [currentTime, setCurrentTime] = useState(
  () => new Date('2026-10-24T02:30:00Z')
)

  // useEffect(() => {
  //   if (!clockVisible) return undefined
  //   const interval = window.setInterval(() => setCurrentTime(new Date()), 60000)
  //   return () => window.clearInterval(interval)
  // }, [clockVisible])

useEffect(() => {
  if (!clockVisible) return undefined
  return undefined
}, [clockVisible])

  const { current: currentEvent, upcoming: upcomingEvents } = getVisibleEvents(events, currentTime)

  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Edmonton',
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: 'h12',
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
        <>
          <section className={`clock-panel ${darkMode ? 'clock-panel-dark' : ''}`} aria-label="Edmonton time">
            <time className="clock-time">{time}</time>
            <span className="clock-date">{date}</span>
          </section>
          <section className={`schedule-panel ${darkMode ? 'schedule-panel-dark' : ''}`} aria-label="Event schedule">
            {currentEvent && (
              <article className="current-event">
                <div className="event-details">
                  <strong className="current-event-title">{currentEvent.title}</strong>
                  <span className="current-event-location">{currentEvent.location}</span>
                </div>
                <strong className="current-event-time">
                  {formatEventTime(currentEvent.start)} - {formatEventTime(currentEvent.end)}
                </strong>
              </article>
            )}
            <div className="schedule-upcoming">
              {upcomingEvents.map(event => (
                <article className="upcoming-event" key={event.id}>
                  <div className="event-details">
                    <strong className="upcoming-event-title">{event.title}</strong>
                    <span className="upcoming-event-location">{event.location}</span>
                  </div>
                  <strong className="upcoming-event-time">{formatEventTime(event.start)}</strong>
                </article>
              ))}
            </div>
          </section>
        </>
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
