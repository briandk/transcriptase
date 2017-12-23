/* eslint-env jasmine */

describe('Launching the app', () => {
  it('creates a visible window', () => {
    const Application = require('spectron').Application
    let app = new Application({
      path: 'node_modules/.bin/electron',
      args: ['built/index.js']
    })

    // app.start()
    //   .then(() => { return app.browserWindow.isVisible() })
    //   .then((isVisible) => { expect(isVisible).toBe('red') })
    //   .then(() => { return app.stop() })
    // expect(app.browserWindow.isVisible()).toBe(true)
    // return app.browserWindow.isVisible()
  })
})
