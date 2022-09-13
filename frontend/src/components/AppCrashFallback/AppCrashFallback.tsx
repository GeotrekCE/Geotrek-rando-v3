import { Sentry } from 'services/sentry';

import { Button, Title } from './AppCrashFallback.style';

export interface FallbackProps {
  eventId: string;
}

// TS reports `showReportDialog` as not being a property of `@sentry/node`. This
// is correct, except we use `@sentry/browser` in the browser!
// @ts-ignore-next-line
const reportDialog = (eventId: string) => () => Sentry.showReportDialog({ eventId });

export const AppCrashFallback: React.FC<FallbackProps> = ({ eventId }) => {
  return (
    <main className="flex justify-center">
      <div className="mx-5 my-10">
        <Title>Sorry, this is not working properly.</Title>
        <p className="my-6">We know about this issue and are working to fix it.</p>
        <p>In the meantime, here is what you can do:</p>
        <ul className="list-disc m-3">
          <li className="my-2">Refresh the page (sometimes it helps).</li>
          <li className="my-2">Try again in 30 minutes.</li>
          {process.env.SENTRY_DSN !== undefined && (
            <li className="my-2">
              <Button onClick={reportDialog(eventId)}>Tell us what happened</Button>
            </li>
          )}
        </ul>
      </div>
    </main>
  );
};
