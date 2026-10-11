import { useEffect, useState } from 'react'
import Aurora from './components/Aurora'
import BannerDisplay from './components/BannerDisplay'
import ClockDisplay from './components/ClockDisplay'
import DisplayControls from './components/DisplayControls'
import ScheduleDisplay from './components/ScheduleDisplay'
import SponsorDisplay from './components/SponsorDisplay'
import bannerImage from './assets/MRUHacks2026BannerBlack.png'
import bannerImageWhite from './assets/MRUHacks2026BannerWhite.png'
import eventsCsv from './assets/Event.csv?raw'
import { getVisibleEvents, parseSchedule } from './utils/schedule'
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
      <BannerDisplay
        displayMode={displayMode}
        darkMode={darkMode}
        bannerImage={bannerImage}
        bannerImageWhite={bannerImageWhite}
      />
      <SponsorDisplay
        displayMode={displayMode}
        darkMode={darkMode}
        sponsorImages={sponsorImages}
        sponsorIndex={sponsorIndex}
      />
      {clockVisible && (
        <>
          <ClockDisplay darkMode={darkMode} time={time} date={date} />
          <ScheduleDisplay
            darkMode={darkMode}
            currentEvent={currentEvent}
            currentEventProgress={currentEventProgress}
            upcomingEvents={upcomingEvents}
          />
        </>
      )}
      <DisplayControls
        clockVisible={clockVisible}
        darkMode={darkMode}
        onToggleClock={() => setClockVisible(visible => !visible)}
        onToggleTheme={() => setDarkMode(mode => !mode)}
      />
    </main>
  )
}

export default App
