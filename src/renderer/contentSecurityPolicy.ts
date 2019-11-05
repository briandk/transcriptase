import { session, OnResponseStartedListenerDetails } from "electron"

export const setContentSecurityPolicy = (): void => {
  session.defaultSession.webRequest.onHeadersReceived(
    (details: OnResponseStartedListenerDetails, callback: Function): void => {
      callback({ responseHeaders: `default-src 'none'` })
    },
  )
}
