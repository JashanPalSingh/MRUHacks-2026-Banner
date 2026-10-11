function ClockDisplay({ darkMode, time, date }) {
  return (
    <section className={`clock-panel ${darkMode ? 'clock-panel-dark' : ''}`} aria-label="Edmonton time">
      <time className="clock-time">{time}</time>
      <span className="clock-date">{date}</span>
    </section>
  )
}

export default ClockDisplay
