import React, { ReactNode } from "react"
import SplitPane from "react-split-pane"
import "../styles/app-layout-grid.css"
import "../styles/uikit.css"
import "../styles/split-pane-resizer.css"
import { ErrorBoundary } from "./ErrorBoundary"
import { PlayerContainer } from "./videoContainer"
import { TranscriptEditor } from "./TranscriptEditor"
import ReactDOM from "react-dom"

interface AppLayoutState {
  pathToMedia: string
}

export class AppLayout extends React.Component<{}, AppLayoutState> {
  public constructor(props: {}) {
    super(props)
  }

  public render(): ReactNode {
    return (
      <React.Fragment>
        <SplitPane split="vertical" minSize={200} defaultSize={400}>
          <div>
            <ErrorBoundary>
              <PlayerContainer />
            </ErrorBoundary>
          </div>
          <div className="uk-card uk-overflow-auto uk-card-default">
            <div
              className="uk-card-body uk-overflow-auto editor-container"
              id="editor-card"
              color="black"
            >
              <ErrorBoundary>
                <TranscriptEditor />
              </ErrorBoundary>
            </div>
          </div>
        </SplitPane>
      </React.Fragment>
    )
  }
}

export const renderRoot = (): void => {
  ReactDOM.render(
    <ErrorBoundary>
      <AppLayout />
    </ErrorBoundary>,
    document.getElementById("app"),
  )
}
