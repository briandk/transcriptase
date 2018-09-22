import React from "react"

interface PlaybackRateSliderProps {
  mediaPlayer: React.RefObject<HTMLVideoElement>
}

export class PlaybackRateSlider extends React.Component<PlaybackRateSliderProps, {}> {
  constructor(props: PlaybackRateSliderProps) {
    super(props)
  }
  render() {
    return (
      // <div className="uk-card uk-card-default uk-card-small uk-card-body playback-rate-slider">
      <fieldset className="uk-fieldset">
        {/* <legend className="uk-legend">Playback Settings</legend> */}
        <div className="PlaybackRateSlider">
          {/* <label>Playback Speed</label> */}
          <div className="uk-card uk-card-primary">Hi</div>
          <input
            type="range"
            min="0.25"
            max="2.0"
            step="0.25"
            defaultValue="1.0"
            list="tickmarks"
            id="myInput"
            className="uk-range"
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
        </div>
      </fieldset>
    )
  }
}
