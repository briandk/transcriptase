import { session, OnResponseStartedDetails } from "electron"

export const setContentSecurityPolicy: () => void = () => {
  session.defaultSession.webRequest.onHeadersReceived(
    (details: OnResponseStartedDetails, callback: Function) => {
      callback({ responseHeaders: `default-src 'none'` })
    },
  )
}
