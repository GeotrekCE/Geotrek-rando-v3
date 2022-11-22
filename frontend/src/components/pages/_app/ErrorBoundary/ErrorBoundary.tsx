import { Component, ComponentType, ReactNode } from 'react';
import { FallbackProps } from 'components/AppCrashFallback/AppCrashFallback';
import { captureException } from '@sentry/nextjs';

export interface ErrorBoundaryProps {
  FallbackComponent: ComponentType<FallbackProps>;
  eventId?: string;
  children?: React.ReactElement;
}
interface ErrorBoundaryState {
  eventId: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    eventId: '',
  };

  static getDerivedStateFromProps(
    props: ErrorBoundaryProps,
    state: ErrorBoundaryState,
  ): ErrorBoundaryState {
    return {
      eventId: props.eventId ?? state.eventId,
    };
  }

  componentDidCatch(error: Error): void {
    const eventId = captureException(error);
    this.setState({ eventId });
  }
  render(): ReactNode {
    const { eventId } = this.state;
    const { FallbackComponent, children } = this.props;
    return eventId?.length > 0 ? <FallbackComponent eventId={eventId} /> : children;
  }
}
