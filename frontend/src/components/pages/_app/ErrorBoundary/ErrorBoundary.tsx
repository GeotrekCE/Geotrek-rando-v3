import { Component, ComponentType, ErrorInfo, ReactNode } from 'react';

import { FallbackProps } from 'components/AppCrashFallback/AppCrashFallback';
import { captureException } from 'services/sentry';

export interface ErrorBoundaryProps {
  FallbackComponent: ComponentType<FallbackProps>;
  hasError?: boolean;
  eventId?: string;
}
interface ErrorBoundaryState {
  hasError: boolean;
  eventId: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    hasError: false,
    eventId: '',
  };

  static getDerivedStateFromProps(
    props: ErrorBoundaryProps,
    state: ErrorBoundaryState,
  ): ErrorBoundaryState {
    // Handles case where hasError is passed in as a prop too
    const { hasError = false } = props;
    return {
      hasError: hasError || state.hasError || false,
      eventId: props.eventId ?? state.eventId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const eventId = captureException(error, { errorInfo });
    this.setState({ eventId, hasError: true });
  }

  render(): ReactNode {
    const { hasError, eventId } = this.state;
    const { FallbackComponent, children } = this.props;
    return hasError ? <FallbackComponent eventId={eventId} /> : children;
  }
}
