/* eslint-env jasmine */

describe('Padding short timestamps like 0:23', function () {
  const padTimestamp = require('../renderer-process/padTimestamp')
  const moment = require('moment')

  it('pads timecodes with single leading digits',
    function () {
      const timestamp = '0:23'
      const timeInSeconds = moment
        .duration(
          padTimestamp(timestamp)
        )
        .asSeconds()
      expect(timeInSeconds).toBe(23)
    })
})
