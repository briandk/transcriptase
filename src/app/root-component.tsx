import React from "react"
import "../styles/app-layout-grid.css"
import { PlayerContainer } from "./components/videoContainer"
import { Editor } from "./components/editor"

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
        <Editor />
      </div>
    )
  }
}

export { AppLayout }
