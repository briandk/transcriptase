import React from "react"
import { Div } from "glamorous"
import "./styles/app-layout-grid.css"
import "./styles/uikit.css"
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
        <PlayerContainer />
        <div className="uk-card uk-overflow-auto uk-card-default">
          <Div
            className="uk-card-body uk-overflow-auto editor-container"
            id="editor-card"
            color="black"
            padding="5%"
          >
            <Editor />
          </Div>
        </div>
      </div>
    )
  }
}

export const renderRoot = () => {
  ReactDOM.render(<AppLayout />, document.getElementById("app"), () => {})
}
