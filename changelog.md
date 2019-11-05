# Version 1.5.0

## New Features

- Transcriptase now uses [`localstorage`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) to persist the state of the app. If it unexpectedly quits, you can still relaunch the app and pick up right where you left off.

## Major Changes

- Upgraded to [Electron 7.x](https://electronjs.org/releases/stable#7.0.0)

# Version 1.4.0

# Version 1.3.2

## Major Changes

- Updated to Electron 4.x

## Major fixes

- Users could not scroll below the bottom of the text editor, which must have made editing long transcripts impossible. That's fixed (#116 and #117).
- Updated several packages due to critical vulnerability exploits

# Version 1.3

- The main window now has a movable divider, so you can make the video player take up almost the whole window
- Ahem, you could also make the editor take up almost the whole window, too. Just saying.

# Version 1.2

## Major Changes

- The editor now supports live-formatting of Markdown syntax as you type!
- A playback speed slider lets you control how quickly or slowly your media plays back.

# Version 1.1

## Major Changes

- Added a slider to control playback speed (#106)
- Add support for real-time markdown preview (#108)
- Change drag-over behavior for files. Now, ondragover will show a "link" icon instead of a "copy" icon. "Link" more accurately reflects what's actually happening. (commit c7e52270e17092e95d833aae5f29ea3158cc8fc1)

## Minor Changes

- Update slate to 0.40 (and update associated dependencies)
- Make editor text black by default ()

# Version 1.0

Initial rease!
