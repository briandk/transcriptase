import React from "react"
import "../styles/app-layout-grid.css"
import { PlayerContainer } from "./components/videoContainer"
import { Editor } from "./components/editor"
import { Event, ipcRenderer } from "electron"
import { userHasChosenMediaFile } from "./channelNames"

interface AppLayoutState {
  pathToMedia: string
}

interface AppLayoutProps {}

class AppLayout extends React.Component<AppLayoutProps, AppLayoutState> {
  constructor(props: AppLayoutProps) {
    super(props)
    this.state = { pathToMedia: "" }
  }

  public componentDidMount() {
    ipcRenderer.on(userHasChosenMediaFile, (event: Event, filePath: string) => {
      console.log("Filepath is: ", filePath)
      this.setState({ pathToMedia: filePath })
    })
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
