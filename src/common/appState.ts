interface AppState {
  transcript: string
  userWantsToQuit: boolean
  safeToQuit: boolean
  lastSavedFilepath: string
  lastSavedFileName: string
  pathToMediaSource: string
  currentTime: number
}

const appState: AppState = {
  transcript: "",
  userWantsToQuit: false,
  safeToQuit: false,
  lastSavedFileName: "",
  lastSavedFilepath: "",
  pathToMediaSource: "",
  currentTime: 0,
}

export function getAppState<K extends keyof AppState>(key: K): AppState[K] {
  return appState[key]
}

export function setAppState<T, K extends keyof AppState, V extends AppState[K]>(
  key: K,
  value: V,
): void {
  appState[key] = value
}

export const logAppState = (): void => {
  console.log("App state is", appState)
}
