import React from "react"
import { Div } from "glamorous"
import "./styles/app-layout-grid.css"
import "./styles/uikit.css"
import "./styles/split-pane-resizer.css"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { PlayerContainer } from "./components/videoContainer"
import { MarkdownPreviewEditor as Editor } from "./components/editorContainer"
import SplitPane from "react-split-pane"
import ReactDOM from "react-dom"

interface AppLayoutState {
  pathToMedia: string
}

interface AppLayoutProps {}

export class AppLayout extends React.Component<AppLayoutProps, AppLayoutState> {
  constructor(props: AppLayoutProps) {
    super(props)
  }

  public render() {
    return (
      <SplitPane split="vertical" minSize={400}>
        <ErrorBoundary>
          <PlayerContainer />
        </ErrorBoundary>
        <div className="uk-card uk-overflow-auto uk-card-default">
          <Div
            className="uk-card-body uk-overflow-auto editor-container"
            id="editor-card"
            color="black"
            padding="5%"
          >
            <ErrorBoundary>
              <Editor />
            </ErrorBoundary>
          </Div>
        </div>
      </SplitPane>
    )
  }
}

export const renderRoot = () => {
  ReactDOM.render(
    <ErrorBoundary>
      <AppLayout />
    </ErrorBoundary>,
    document.getElementById("app"),
    () => {},
  )
}
