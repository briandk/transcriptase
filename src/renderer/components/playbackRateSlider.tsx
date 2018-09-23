import React from "react"
import { ErrorBoundary } from "./ErrorBoundary"

interface setPlaybackRate {
  (n: number): void
}

interface PlaybackRateSliderProps {
  setRate: setPlaybackRate
  playbackRate: number
}

interface PlaybackRateOutputProps {
  playbackRate: number
}

export interface PlaybackContainerProps {
  playbackRate: number
  setPlaybackRate: setPlaybackRate
}

class PlaybackRateSlider extends React.Component<PlaybackRateSliderProps, {}> {
  constructor(props: PlaybackRateSliderProps) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event: any): null {
    this.props.setRate(event.target.value)
    return null
  }
  render() {
    return (
      <React.Fragment>
        <input
          type="range"
          min="0.25"
          max="2.0"
          step="0.25"
          list="tickmarks"
          id="myInput"
          className="uk-range"
          onChange={this.handleChange}
          value={this.props.playbackRate}
        />
        <datalist id="tickmarks">
          <option value="0.25" label="0.25x" />
          <option value="0.5" label="0.5x" />
          <option value="0.75" label="0.75x" />
          <option value="1" label="1.0x" />
          <option value="1.25" label="1.25x" />
          <option value="1.5" label="1.5x" />
          <option value="1.75" label="1.75x" />
          <option value="2.0" label="2.0x" />
        </datalist>
      </React.Fragment>
    )
  }
}

class PlaybackRateOutput extends React.Component<PlaybackRateOutputProps, {}> {
  constructor(props: PlaybackRateOutputProps) {
    super(props)
  }
  render() {
    if (this.props.playbackRate) {
      return <span className="uk-text-primary">{this.props.playbackRate}x</span>
    } else {
      return null
    }
  }
}

//  PlaybackSpeedOutput = () => {
//   return <span className="uk-badge"></span>
// }

export class PlaybackRateContainer extends React.Component<PlaybackContainerProps, {}> {
  constructor(props: any) {
    super(props)
  }
  render() {
    console.log(this.props)
    if (this.props.playbackRate) {
      return (
        // <div className="uk-card uk-card-default uk-card-small uk-card-body playback-rate-slider">
        <ErrorBoundary>
          <form id="playback-rate-container">
            <fieldset className="uk-fieldset">
              <label className="uk-text-muted">
                Playback Rate: <PlaybackRateOutput playbackRate={this.props.playbackRate} />
              </label>
              <PlaybackRateSlider
                setRate={this.props.setPlaybackRate}
                playbackRate={this.props.playbackRate}
              />
            </fieldset>
          </form>
        </ErrorBoundary>
      )
    } else {
      return null
    }
  }
}
