import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }
  }
}

export default ErrorBoundary;
