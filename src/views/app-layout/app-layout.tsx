import * as React from "react"

interface AppLayoutState {}

class AppLayout extends React.Component<{}, AppLayoutState> {
  state: AppLayoutState = {}

  public render() {
    return (
      <div id="content" className="uk-margin-top uk-margin-left uk-margin-right uk-container">
        <h1>Hello, World!</h1>
        <div className="uk-grid">
          <div id="video-player-container" className="video-player-container uk-width-1-2">
            <video id="video-player" className="video-js">
              <source />
            </video>
          </div>
          <div className="uk-width-1-2 transcript-column">
            <div className="editor-container" data-last-saved-path="">
              <div id="toolbar">
                {/* <button id="timestamp-button">
                  <span className="fa fa-clock-o fa-2x" />
                </button> */}
              </div>
              <div className="transcript-editor" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export { AppLayout }
