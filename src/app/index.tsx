// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.
import React from "react"
import ReactDOM from "react-dom"
import { AppLayout as RootComponent } from "./root-component"
import { webFrame } from "electron"

/**
 * CSS reset
 */

/**
 * Electron-focused CSS resets
 */

/**
 * Zooming resets
 */
webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

/**
 * Drag and drop resets
 */
document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())

// mount the root component

ReactDOM.render(<RootComponent />, document.getElementById("root"), () => {})
