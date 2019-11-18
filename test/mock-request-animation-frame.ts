/**
 * Poor man's polyfill for raf.
 */

// @ts-ignore
global.window = global
window.addEventListener = (): void => {}
window.requestAnimationFrame = (): number => 1
