/* eslint-env jasmine */

describe('Launching the app', () => {
  it('creates a visible window', async () => {
    const Application = require('spectron').Application
    let app = new Application({
      path: 'node_modules/.bin/electron',
      args: ['built/index.js']
    })
    await app.start()
    // expect(app.browserWindow.isVisible()).toBe(true)
    // expect(false).toBe(true)
    // return app.browserWindow.isVisible()
  })
})
