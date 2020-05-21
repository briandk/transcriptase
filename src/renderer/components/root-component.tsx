import React from "react"
import SplitPane from "react-split-pane"
import "../styles/app-layout-grid.css"
import "../styles/split-pane-resizer.css"
import { ErrorBoundary } from "./ErrorBoundary"
import { PlayerContainer } from "./videoContainer"
import { TranscriptEditor } from "./TranscriptEditor"
import ReactDOM from "react-dom"
// import { nativeTheme } from "electron"

function AppLayout(): JSX.Element {
  return (
    <SplitPane split="vertical" minSize={200} defaultSize={400}>
      <div id="video-container">
        <ErrorBoundary>
          <PlayerContainer />
        </ErrorBoundary>
      </div>
      <div>
        <div>
          <ErrorBoundary>
            <TranscriptEditor />
          </ErrorBoundary>
        </div>
      </div>
    </SplitPane>
  )
}

export function renderRoot(): void {
  ReactDOM.render(
    <ErrorBoundary>
      <AppLayout />
    </ErrorBoundary>,
    document.getElementById("app"),
  )
}
