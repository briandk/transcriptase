// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.

import { renderRoot } from "./components/root-component"

/**
 * Drag and drop resets
 */
document.addEventListener("dragover", (event): void => event.preventDefault())
document.addEventListener("drop", (event): void => event.preventDefault())

// mount the root component
renderRoot()
