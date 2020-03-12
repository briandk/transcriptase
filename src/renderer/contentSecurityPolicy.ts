import { session, OnHeadersReceivedListenerDetails } from "electron"

export const setContentSecurityPolicy = (): void => {
  session.defaultSession.webRequest.onHeadersReceived(
    (details: OnHeadersReceivedListenerDetails, callback: Function): void => {
      callback({ responseHeaders: `default-src 'none'` })
    },
  )
}
