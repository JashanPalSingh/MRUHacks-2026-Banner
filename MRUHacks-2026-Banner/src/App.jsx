import { useEffect, useState } from 'react'
import Aurora from './components/Aurora'
import bannerImage from './assets/MRUHacks2026BannerBlack.png'
import bannerImageWhite from './assets/MRUHacks2026BannerWhite.png'
import eventsCsv from './assets/Event.csv?raw'
import { formatEventTime, getVisibleEvents, parseSchedule } from './utils/schedule'
import './App.css'

const events = parseSchedule(eventsCsv)
const sponsorImages = Object.values(import.meta.glob(
  './assets/sponsors/*.{png,jpg,jpeg,webp,gif}',
  { eager: true, import: 'default', query: '?url' },
))
// const testClockEnabled = true
// const testClockStart = new Date('2026-10-24T20:00:00-06:00')
// const testClockMinutesPerSecond = 5

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [clockVisible, setClockVisible] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => new Date())
  const [displayMode, setDisplayMode] = useState('banner')
  const [sponsorIndex, setSponsorIndex] = useState(0)

  // const [currentTime, setCurrentTime] = useState(() => (
  //   testClockEnabled ? testClockStart : new Date()
  // ))

  useEffect(() => {
    if (!clockVisible) return undefined

    // if (testClockEnabled) {
    //   const startedAt = Date.now()
    //   const interval = window.setInterval(() => {
    //     const elapsedSeconds = (Date.now() - startedAt) / 1000
    //     setCurrentTime(new Date(
    //       testClockStart.getTime() + elapsedSeconds * testClockMinutesPerSecond * 60 * 1000,
    //     ))
    //   }, 1000)
    //   return () => window.clearInterval(interval)
    // }

    const interval = window.setInterval(() => setCurrentTime(new Date()), 60000)
    return () => window.clearInterval(interval)
  }, [clockVisible])

  useEffect(() => {
    if (sponsorImages.length === 0) return undefined
    const duration = displayMode === 'banner' ? 60000 : 5000
    const timeout = window.setTimeout(() => {
      if (displayMode === 'banner') {
        setSponsorIndex(0)
        setDisplayMode('sponsor')
      } else if (sponsorIndex + 1 < sponsorImages.length) {
        setSponsorIndex(index => index + 1)
      } else {
        setSponsorIndex(0)
        setDisplayMode('banner')
      }
    }, duration)
    return () => window.clearTimeout(timeout)
  }, [displayMode, sponsorIndex])

  const { current: currentEvent, upcoming: upcomingEvents } = getVisibleEvents(events, currentTime)
  const currentEventProgress = currentEvent
    ? Math.min(Math.max((currentTime - currentEvent.start) / (currentEvent.end - currentEvent.start), 0), 1)
    : 0

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
    <main className={`app-shell ${darkMode ? 'app-shell-dark' : ''}`}>
      <Aurora
        colorStops={["#FADF4B", "#D841A1", "#93FFFF"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
        lightMode={!darkMode}
      />
      <img
        className={`banner-image ${displayMode !== 'banner' || darkMode ? 'banner-image-hidden' : ''}`}
        src={bannerImage}
        alt="MRUHacks 2026"
      />
      <img
        className={`banner-image ${displayMode !== 'banner' || !darkMode ? 'banner-image-hidden' : ''}`}
        src={bannerImageWhite}
        alt=""
        aria-hidden="true"
      />
      <section
        className={`sponsor-stage ${displayMode === 'sponsor' ? '' : 'banner-image-hidden'}`}
        aria-label="Event sponsor"
      >
        {sponsorImages.map((image, index) => (
          <img
            className={`sponsor-image ${index === sponsorIndex ? '' : 'sponsor-image-hidden'}`}
            key={image}
            src={image}
            alt="Event sponsor logo"
          />
        ))}
        <strong className={`sponsor-label ${darkMode ? 'sponsor-label-dark' : ''}`}>
          Brought to you by
        </strong>
      </section>
      {clockVisible && (
        <>
          <section className={`clock-panel ${darkMode ? 'clock-panel-dark' : ''}`} aria-label="Edmonton time">
            <time className="clock-time">{time}</time>
            <span className="clock-date">{date}</span>
          </section>
          <section className={`schedule-panel ${darkMode ? 'schedule-panel-dark' : ''}`} aria-label="Event schedule">
            {currentEvent && (
              <article
                className="current-event"
                style={{ '--event-progress': `${currentEventProgress * 100}%` }}
              >
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
