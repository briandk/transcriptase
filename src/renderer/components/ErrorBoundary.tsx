import React, { ReactNode } from "react"

const sendToErrorReporting = (error: Error, info: any): void => {
  console.log(error)
  console.log(info)
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<
  Record<string, unknown>,
  ErrorBoundaryState
> {
  public constructor(props: Record<string, unknown>) {
    super(props)
    this.state = { hasError: false }
  }
  public componentDidCatch(error: Error, info: any): void {
    this.setState((state): ErrorBoundaryState => ({ ...state, hasError: true }))
    sendToErrorReporting(error, info)
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return <div>Sorry, something went wrong.</div>
    } else {
      return this.props.children
    }
  }
}
