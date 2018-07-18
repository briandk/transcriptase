import React from "react"
import "../styles/app-layout-grid.css"
import { MediaContainer } from "./components/media-player"
import { Editor } from "./components/editor"

interface AppLayoutState {}

class AppLayout extends React.Component<{}, AppLayoutState> {
  state: AppLayoutState = {}

  public render() {
    return (
      <div className="grid-container">
        <MediaContainer />
        <Editor />
      </div>
    )
  }
}

export { AppLayout }
