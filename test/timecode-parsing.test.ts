import { padToHoursMinutesSeconds, parseRawTimestamp } from "../src/renderer/padTimestamp"

describe("Parsing raw timecodes into durations of seconds to hand to the player", () => {
  it("should convert short timestamps to seconds", () => {
    const shortTimestamp = "[2:47]"
    const expectedSeconds = 167

    expect(parseRawTimestamp(shortTimestamp)).toBeCloseTo(expectedSeconds)

    const shortTimestamp2 = "[3:38.66]"
    const expectedSeconds2 = 218.66

    expect(padToHoursMinutesSeconds(shortTimestamp2)).toBe("00:3:38.66")
    expect(parseRawTimestamp(shortTimestamp2)).toEqual(expectedSeconds2)
  })
  it("should convert padded short timestamps to seconds", () => {
    const paddedShortTimestamp = "[03:33]"
    const expectedSeconds = 213

    expect(parseRawTimestamp(paddedShortTimestamp)).toBeCloseTo(expectedSeconds)
  })
  it("should properly parse hours-minutes-seconds", () => {
    const hoursMinutesSeconds = "[1:02:00.00]"
    const expectedSeconds = 3720

    expect(parseRawTimestamp(hoursMinutesSeconds)).toBeCloseTo(expectedSeconds)
  })
})
