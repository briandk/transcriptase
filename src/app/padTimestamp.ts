const padToHoursMinutesSeconds: (s: string) => string = (timestamp: string) => {
  const shortTimestampPattern: RegExp = /^\d{1,2}:\d\d$/;
  const paddedTimestamp: string = `00:${timestamp}`;

  if (shortTimestampPattern.test(timestamp)) {
    return paddedTimestamp;
  } else {
    return timestamp;
  }
};

export { padToHoursMinutesSeconds };
