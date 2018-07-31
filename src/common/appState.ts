export interface AppState {
  transcript: string
}

let appState: AppState = { transcript: "" }

export const setAppState = (state: AppState) => {
  appState = state
}

export const getAppState = () => {
  return appState
}
