// describe("A suite", function() {
//   it("contains spec with an expectation", function() {
//     expect(true).toBe(true);
//   });
// });

describe('Inserting the current time', function () {
  it('converts duration in seconds to a formatted time string', function () {
    const { formatDuration } = require('./../renderer-process/insertCurrentTime')
    const moment = require('moment')
    const duration1 = moment.duration(144, 'seconds')
    expect(formatDuration(duration1)).toBe('02:24')
  })
})
