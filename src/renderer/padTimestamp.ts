export const padToHoursMinutesSeconds = (timestamp: string): string => {
  const shortTimestampPattern = /^\d{1,2}:\d\d$/
  const paddedTimestamp = `00:${timestamp}`

  if (shortTimestampPattern.test(timestamp)) {
    return paddedTimestamp
  } else {
    return timestamp
  }
}
