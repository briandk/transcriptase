type AppStateKey =
  | "transcript"
  | "userWantsToQuit"
  | "safeToQuit"
  | "lastSavedFilepath"
  | "lastSavedFileName"
  | "pathToMediaSource"
  | "currentTime"

type AppStateValue = true | false | string | number

const appState = new Map()

export const setAppState = (key: AppStateKey, value: AppStateValue): void => {
  appState.set(key, value)
}

export const getAppState = (key: AppStateKey): AppStateKey => {
  return appState.get(key)
}

export const logAppState = (): void => {
  console.log("App state is", appState)
}

setAppState("transcript", "")
setAppState("userWantsToQuit", false)
setAppState("safeToQuit", false)
setAppState("lastSavedFilepath", null)
setAppState("lastSavedFileName", null)
setAppState("pathToMediaSource", null)
setAppState("currentTime", 0)
