import { fireEvent, render, screen } from 'services/testing/reactTestingLibraryWrapper';

import { Sentry } from 'services/sentry';
import { AppCrashFallback } from '../AppCrashFallback';

jest.mock('services/sentry', () => ({
  Sentry: {
    showReportDialog: jest.fn(),
  },
}));
test('AAU, when I click on the feedback button, I open the sentry report dialog', () => {
  const eventId = 'testId';
  render(<AppCrashFallback eventId={eventId} />);

  // @ts-ignore-next-line
  const showReportDialogSpy = jest.spyOn(Sentry, 'showReportDialog');

  fireEvent.click(screen.getByRole('button', { name: /tell us what happened/i }));
  // @ts-ignore-next-line
  expect(showReportDialogSpy).toHaveBeenCalledWith({ eventId });
});
