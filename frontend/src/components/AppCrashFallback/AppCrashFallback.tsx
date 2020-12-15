/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { FunctionComponent } from 'react';

import { Sentry } from 'services/sentry';

import { Button, Container, HelperList, PageContent, Title } from './AppCrashFallback.style';

/**
 * Error page inspiration https://medium.com/design-ideas-thoughts/designing-error-pages-8d82e16e3472
 */

export interface FallbackProps {
  eventId: string;
}

// TS reports `showReportDialog` as not being a property of `@sentry/node`. This
// is correct, except we use `@sentry/browser` in the browser!
// @ts-ignore-next-line
const reportDialog = (eventId: string) => () => Sentry.showReportDialog({ eventId });

export const AppCrashFallback: FunctionComponent<FallbackProps> = ({ eventId }) => {
  return (
    <main>
      {/* The <main> tag needs to wrap this component because with redux errors,
      style is not applied to the root tag of this component */}
      <Container>
        <PageContent>
          <Title>Sorry, this is not working properly.</Title>
          <br />
          <p>We know about this issue and are working to fix it.</p>
          <br />
          <p>In the meantime, here is what you can do:</p>
          <HelperList>
            <li>Refresh the page (sometimes it helps).</li>
            <li>Try again in 30 minutes.</li>
            <li>
              <Button onClick={reportDialog(eventId)}>Tell us what happened</Button>
            </li>
          </HelperList>
        </PageContent>
      </Container>
    </main>
  );
};
