const EDMONTON_TIME_ZONE = 'America/Edmonton'

const edmontonParts = new Intl.DateTimeFormat('en-CA', {
  timeZone: EDMONTON_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
})

const displayTime = new Intl.DateTimeFormat('en-US', {
  timeZone: EDMONTON_TIME_ZONE,
  hour: 'numeric',
  minute: '2-digit',
})

const parseTime = value => {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return null
  let hour = Number(match[1])
  const minute = Number(match[2])
  const period = match[3].toUpperCase()
  if (hour === 12) hour = 0
  if (period === 'PM') hour += 12
  return { hour, minute }
}

const zonedDateTimeToUtc = (dateValue, timeValue) => {
  const [year, month, day] = dateValue.split('-').map(Number)
  const time = parseTime(timeValue)
  if (!time) return null

  const wallTime = Date.UTC(year, month - 1, day, time.hour, time.minute)
  let candidate = new Date(wallTime)
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const parts = edmontonParts.formatToParts(candidate).reduce((result, part) => {
      if (part.type !== 'literal') result[part.type] = Number(part.value)
      return result
    }, {})
    const renderedWallTime = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second,
    )
    candidate = new Date(candidate.getTime() + wallTime - renderedWallTime)
  }
  return candidate
}

export const parseSchedule = csv => csv
  .trim()
  .split(/\r?\n/)
  .slice(1)
  .map(line => line.split(',').map(value => value.trim()))
  .filter(columns => columns.length >= 6 && columns[0])
  .map(([title, location, startDate, startTime, endDate, endTime], index) => ({
    id: `${title}-${startDate}-${startTime}-${index}`,
    title,
    location,
    start: zonedDateTimeToUtc(startDate, startTime),
    end: zonedDateTimeToUtc(endDate, endTime),
  }))
  .filter(event => event.start && event.end)
  .sort((first, second) => first.start - second.start)

export const getVisibleEvents = (events, now) => {
  const activeEvents = events.filter(event => event.start <= now && now < event.end)
  const current = activeEvents.reduce(
    (latest, event) => (!latest || event.start > latest.start ? event : latest),
    null,
  )

  return {
    current,
    upcoming: events.filter(event => event.start > now),
  }
}

export const formatEventTime = date => displayTime.format(date)
