import { fireEvent, render, screen } from 'services/testing/reactTestingLibraryWrapper';

import * as Sentry from '@sentry/nextjs';
import { AppCrashFallback } from '../AppCrashFallback';

const OLD_ENV = process.env;

beforeEach(() => {
  process.env = { ...OLD_ENV, SENTRY_DSN: '<sentryDSNKey>' };
});

test('AAU, when I click on the feedback button, I open the sentry report dialog', () => {
  const eventId = 'testId';
  render(<AppCrashFallback eventId={eventId} />);

  const showReportDialogSpy = jest.spyOn(Sentry, 'showReportDialog');

  fireEvent.click(screen.getByRole('button', { name: /tell us what happened/i }));
  expect(showReportDialogSpy).toHaveBeenCalledWith({ eventId });
});
