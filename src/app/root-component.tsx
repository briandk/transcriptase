import React from "react"
import "../styles/app-layout-grid.css"
import { MediaPlayer } from "./components/media-player"
import { Editor } from "./components/editor"

interface AppLayoutState {
  pathToMedia: string
}

interface AppLayoutProps {}

class AppLayout extends React.Component<AppLayoutProps, AppLayoutState> {
  constructor(props: AppLayoutProps) {
    super(props)
    this.state = { pathToMedia: "" }
  }

  configurePlayer(pathToMedia: string): any {
    const options: any = {
      controls: true,
      autoplay: false,
      fluid: true,
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
    }

    return this.state.pathToMedia
      ? { ...options, sources: [{ src: this.state.pathToMedia }] }
      : options
  }

  public render() {
    return (
      <div className="grid-container">
        <MediaPlayer {...this.configurePlayer(this.state.pathToMedia)} />
        <Editor />
      </div>
    )
  }
}

export { AppLayout }
