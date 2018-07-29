import React from "react"
import "../styles/app-layout-grid.css"
import "../styles/uikit.css"
import "../styles/editor.css"
import { PlayerContainer } from "./components/videoContainer"
import { MarkdownPreviewEditor as Editor } from "./components/editor"

interface AppLayoutState {
  pathToMedia: string
}

interface AppLayoutProps {}

class AppLayout extends React.Component<AppLayoutProps, AppLayoutState> {
  constructor(props: AppLayoutProps) {
    super(props)
  }

  public render() {
    return (
      <div className="grid-container">
        <PlayerContainer />
        <div className="editor-container uk-card uk-card-default uk-overflow-auto">
          <div className="uk-card-body uk-overflow-auto">
            <Editor />
          </div>
        </div>
      </div>
    )
  }
}

export { AppLayout }
