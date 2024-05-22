import * as Sentry from '@sentry/nextjs';

import Button from 'components/Button';

export interface FallbackProps {
  eventId: string;
}

const reportDialog = (eventId: string) => () => Sentry.showReportDialog({ eventId });

export const AppCrashFallback: React.FC<FallbackProps> = ({ eventId }) => {
  return (
    <main className="flex justify-center">
      <div className="mx-5 my-10">
        <h1 className="text-5xl font-bold">Sorry, this is not working properly.</h1>
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
