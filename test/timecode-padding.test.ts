import { padToHoursMinutesSeconds } from "../src/renderer/parseTimestamp"

describe("Padding timestamps out with hours", () => {
  it("should pad short timestamps with two zeros for the minutes", () => {
    const doubleZeroMinutesSeconds = "[00:42]"
    const expectedTimecode = "00:00:42"

    expect(padToHoursMinutesSeconds(doubleZeroMinutesSeconds)).toBe(expectedTimecode)
  })
  it("should pad short single-minute timestamps with no leading zero", () => {
    const noLeadingZeroMinutesSeconds = "[2:43]"
    const expectedTimecode = "00:2:43"

    expect(padToHoursMinutesSeconds(noLeadingZeroMinutesSeconds)).toBe(expectedTimecode)
  })
  it("should pad double-digit minutes with no leading hours", () => {
    const doubleDigitMinutes = "[42:53]"
    const expectedTimecode = "00:42:53"

    expect(padToHoursMinutesSeconds(doubleDigitMinutes)).toBe(expectedTimecode)
  })
  it("should leave single-digit hours unpadded", () => {
    const singleDigitHours = "[1:47:53]"
    const expectedTimecode = "1:47:53"

    expect(padToHoursMinutesSeconds(singleDigitHours)).toBe(expectedTimecode)
  })
  it("should handle fractions of a second", () => {
    const shortDecimalSeconds = "[2:43.77]"
    const expectedTimecode = "00:2:43.77"
    expect(padToHoursMinutesSeconds(shortDecimalSeconds)).toBe(expectedTimecode)

    const minutesSecondsDecimal = "[02:44.77]"
    const expectedTimecode2 = "00:02:44.77"
    expect(padToHoursMinutesSeconds(minutesSecondsDecimal)).toBe(expectedTimecode2)

    const doubleDigitMinutes = "[12:40.990]"
    const expectedTimecode3 = "00:12:40.990"
    expect(padToHoursMinutesSeconds(doubleDigitMinutes)).toBe(expectedTimecode3)
  })
})
