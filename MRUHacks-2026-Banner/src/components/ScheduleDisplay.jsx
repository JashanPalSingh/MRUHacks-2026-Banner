import { formatEventTime } from '../utils/schedule'

function ScheduleDisplay({ darkMode, currentEvent, currentEventProgress, upcomingEvents }) {
  return (
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
  )
}

export default ScheduleDisplay
