/**
 * NOTE: This requires `@sentry/nextjs` version 7.3.0 or higher.
 *
 * NOTE: If using this with `next` version 12.2.0 or lower, uncomment the
 * penultimate line in `CustomErrorComponent`.
 *
 * This page is loaded by Nextjs:
 *  - on the server, when data-fetching methods throw or reject
 *  - on the client, when `getInitialProps` throws or rejects
 *  - on the client, when a React lifecycle method throws or rejects, and it's
 *    caught by the built-in Nextjs error boundary
 *
 * See:
 *  - https://nextjs.org/docs/basic-features/data-fetching/overview
 *  - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  - https://reactjs.org/docs/error-boundaries.html
 */

import * as Sentry from '@sentry/nextjs';
import { AppCrashFallback } from 'components/AppCrashFallback';
import { ErrorBoundary } from 'components/pages/_app/ErrorBoundary/ErrorBoundary';
import { NextPageContext } from 'next';
import NextErrorComponent, { ErrorProps } from 'next/error';

type GetInitialPropsResult = ErrorProps & {
  eventId?: string;
};

const CustomErrorComponent = (props: GetInitialPropsResult) => {
  return <ErrorBoundary FallbackComponent={AppCrashFallback} eventId={props.eventId} />;
};

CustomErrorComponent.getInitialProps = async (
  contextData: NextPageContext,
): Promise<GetInitialPropsResult> => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);
  const eventId = Sentry.lastEventId();

  const result = await NextErrorComponent.getInitialProps(contextData);

  // This will contain the status code of the response
  return {
    ...result,
    eventId,
  };
};

export default CustomErrorComponent;
