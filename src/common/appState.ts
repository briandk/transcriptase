type AppStateKey = "transcript" | "userWantsToQuit" | "safeToQuit" | "lastSavedFilepath"

const appState = new Map()

export const setAppState = (key: AppStateKey, value: any) => {
  appState.set(key, value)
}

export const getAppState = (key: AppStateKey) => {
  return appState.get(key)
}

setAppState("transcript", "")
setAppState("userWantsToQuit", false)
setAppState("safeToQuit", false)
setAppState("lastSavedFilepath", null)
