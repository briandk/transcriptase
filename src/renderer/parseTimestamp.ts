import moment from "moment"

export const removeSquareBrackets = (timestamp: string): string =>
  timestamp.slice(1, timestamp.length - 1)

export const padToHoursMinutesSeconds = (timestamp: string): string => {
  const unpaddedSeconds = /\[\d{1,2}\.{0,1}\d*\]/
  const unpaddedMinutes = /\[\d{1,2}:\d{1,2}\.{0,1}\d*\]/
  const hoursMinutesSeconds = /\[\d+:\d{1,2}:\d{1,2}\.{0,1}\d*\]/
  const rawTimecode = removeSquareBrackets(timestamp)

  if (unpaddedSeconds.test(timestamp)) {
    return `00:00:${rawTimecode}`
  } else if (unpaddedMinutes.test(timestamp)) {
    return `00:${rawTimecode}`
  } else if (hoursMinutesSeconds.test(timestamp)) {
    return rawTimecode
  } else {
    return null
  }
}

export const parseTimestampToSeconds = (timestamp: string): number => {
  const paddedTimecode = padToHoursMinutesSeconds(timestamp)
  const seconds: number = moment.duration(paddedTimecode).asSeconds()

  return seconds
}
