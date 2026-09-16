import { Component, type ErrorInfo, type ReactNode } from "react";
import { trackError } from "../lib/analytics";
import Button from "./Button";

interface State {
  error?: Error;
}

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = {};

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    trackError({
      error_type: "render",
      error_message: error.message.slice(0, 150),
      error_location: window.location.pathname + (info.componentStack?.split("\n")[1] ?? ""),
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto my-24 max-w-md rounded-3xl bg-red-400 p-8 text-center text-white shadow-card">
          <h1 className="text-white">Error: Max call stack exceeded</h1>
          <p className="mt-3">
            Well, not really. Something in this page broke. The experiment has been noted in the lab
            book.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="primary" onClick={() => window.location.reload()}>
              Reload
            </Button>
            <Button onClick={() => window.location.assign("/")}>Home</Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
