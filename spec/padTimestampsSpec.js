/* eslint-env jasmine */

describe("Padding short timestamps like 0:23", function() {
  const padTimestamp = require("../built/renderer-process/padTimestamp");
  const moment = require("moment");

  it("pads timecodes with single leading digits", function() {
    const timestamp = "0:23";
    const timeInSeconds = moment.duration(padTimestamp(timestamp)).asSeconds();
    expect(timeInSeconds).toBe(23);
  });

  it("pads timecodes with *double* leading digits", function() {
    const timestamp = `11:00`;
    const timeInSeconds = moment.duration(padTimestamp(timestamp)).asSeconds();
    expect(timeInSeconds).toBe(660);
  });

  it("leaves full HH:MM:SS as is", function() {
    const timestamp = "1:22:04";
    const paddedTimestamp = padTimestamp(timestamp);
    const paddedDuration = moment.duration(paddedTimestamp);

    expect(paddedDuration.seconds()).toBe(4);
    expect(paddedDuration.minutes()).toBe(22);
    expect(paddedDuration.hours()).toBe(1);
  });
});
