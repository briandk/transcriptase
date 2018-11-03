import React from "react"
import "./styles/app-layout-grid.css"
import "./styles/uikit.css"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { PlayerContainer } from "./components/videoContainer"
import { MarkdownPreviewEditor as Editor } from "./components/editorContainer"
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
      <div className="grid-container">
        <ErrorBoundary>
          <PlayerContainer />
        </ErrorBoundary>
        <div className="uk-card uk-overflow-auto uk-card-default">
          <div
            className="uk-card-body uk-overflow-auto editor-container"
            id="editor-card"
            color="black"
          >
            <React.Fragment>
              <ErrorBoundary>
                <ul className="uk-tab">
                  <li className="uk-active">
                    <a href="#">Editor</a>
                  </li>
                  <li>
                    <a href="#charts-container">Charts</a>
                  </li>
                </ul>
              </ErrorBoundary>
            </React.Fragment>
            <React.Fragment>
              <Editor />
            </React.Fragment>
            <React.Fragment>
              <div id="charts-container">Chorts!</div>
            </React.Fragment>
          </div>
        </div>
      </div>
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
