type AppStateKey =
  | "transcript"
  | "userWantsToQuit"
  | "safeToQuit"
  | "lastSavedFilepath"
  | "lastSavedFileName"
  | "pathToMediaSource"

const appState = new Map()

export const setAppState = (key: AppStateKey, value: any) => {
  appState.set(key, value)
}

export const getAppState = (key: AppStateKey) => {
  return appState.get(key)
}

export const logAppState = () => {
  console.log("App state is", appState)
}

setAppState("transcript", "")
setAppState("userWantsToQuit", false)
setAppState("safeToQuit", false)
setAppState("lastSavedFilepath", null)
setAppState("lastSavedFileName", null)
setAppState("pathToMediaSource", null)
