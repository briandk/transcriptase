# Transcriptase

[![Build Status](https://dev.azure.com/briandk/Transcriptase/_apis/build/status/Transcriptase-Yarn?branchName=master)](https://dev.azure.com/briandk/Transcriptase/_build/latest?definitionId=7&branchName=master)

Transcriptase is a [Github Electron](https://electron.atom.io) app for creating and editing transcripts of media files. It supports a [Markdown](http://commonmark.org/help/)-inspired plain text syntax. That means you're not locked into a proprietary format, and your files are human-readable.

Transcriptase runs on macOS, Windows, and Linux.

## If you want to hack on Transcriptase

### Requirements

- [Git](https://git-scm.com) to get a copy of the code
- [NodeJS](https://nodejs.org) to be able to develop and run the app
- [Yarn](https://yarnpkg.com) to install the app's dependencies

### Directions

1. [Install NodeJS](https://nodejs.org/en/download/package-manager) for your platform.
2. [Install Git](https://git-scm.com/downloads) for your platform
3. [Install Yarn](https://yarnpkg.com/en/docs/install)
4. [Clone](https://github.com/briandk/transcriptase) the repository
5. In your cloned directory, run:

```bash
 # This might take a bit
yarn install

# Starts the app in development mode
yarn start
```
