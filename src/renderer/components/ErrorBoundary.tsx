import React from "react"

const sendToErrorReporting = (error: Error, info: any): void => {
  console.log(error)
  console.log(info)
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  componentDidCatch(error: Error, info: any) {
    this.setState(state => ({ ...state, hasError: true }))
    sendToErrorReporting(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <div>Sorry, something went wrong.</div>
    } else {
      return this.props.children
    }
  }
}
