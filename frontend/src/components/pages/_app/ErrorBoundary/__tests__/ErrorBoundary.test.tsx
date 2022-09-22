import { render, screen } from 'services/testing/reactTestingLibraryWrapper';
import { ErrorBoundary, ErrorBoundaryProps } from '../ErrorBoundary';

const fallbackText = 'This is the fallback text';
const FallbackComponent = () => <div>{fallbackText}</div>;

const childText = 'This is the child text';
const ChildComponent = () => <div>{childText}</div>;

const ChildComponentWithError = () => {
  throw Error('Unknown Error');
};

const defaultErrorBoundaryProps: ErrorBoundaryProps = {
  FallbackComponent,
};

describe('ErrorBoundary without an error in child component', () => {
  test('AAU, I can see the child component', () => {
    render(
      <ErrorBoundary {...defaultErrorBoundaryProps}>
        <ChildComponent />
      </ErrorBoundary>,
    );
    expect(screen.queryByText(fallbackText)).not.toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  test('AAU, if eventId is passed to the ErrorBoundary, I can see the fallback component', () => {
    // Suppress expected error message in console:s
    jest.spyOn(global.console, 'error').mockImplementation(() => {
      /* noop */
    });
    render(
      <ErrorBoundary {...defaultErrorBoundaryProps} eventId="eventID">
        <ChildComponent />
      </ErrorBoundary>,
    );
    expect(screen.queryByText(childText)).not.toBeInTheDocument();
    expect(screen.getByText(fallbackText)).toBeInTheDocument();
  });
});

describe('ErrorBoundary with erroring child component', () => {
  test('AAU, if there is an error in the child component, I can see the fallback component', () => {
    // Suppress expected error message in console:s
    jest.spyOn(global.console, 'error').mockImplementation(() => {
      /* noop */
    });
    render(
      <ErrorBoundary {...defaultErrorBoundaryProps}>
        <ChildComponentWithError />
      </ErrorBoundary>,
    );
    expect(screen.queryByText(childText)).not.toBeInTheDocument();
    expect(screen.getByText(fallbackText)).toBeInTheDocument();
  });
  test('AAU, if eventId is passed to the ErrorBoundary, I can still see the fallback component', () => {
    // Suppress expected error message in console:s
    jest.spyOn(global.console, 'error').mockImplementation(() => {
      /* noop */
    });
    render(
      <ErrorBoundary {...defaultErrorBoundaryProps} eventId="eventID">
        <ChildComponentWithError />
      </ErrorBoundary>,
    );
    expect(screen.queryByText(childText)).not.toBeInTheDocument();
    expect(screen.getByText(fallbackText)).toBeInTheDocument();
  });
});
