import { AppCrashFallback } from 'components/AppCrashFallback';
import { FunctionComponent } from 'react';
import { IntlProvider } from 'react-intl';

import { flattenMessages } from 'services/i18n/intl';
import enMessages from 'translations/en.json';
import frMessages from 'translations/fr.json';
import CSSResets from './CSSResets';
import { ErrorBoundary } from './ErrorBoundary';

const locales = {
  fr: flattenMessages(frMessages),
  en: flattenMessages(enMessages),
};

interface RootProps {
  hasError: boolean;
  errorEventId?: string;
}

export const Root: FunctionComponent<RootProps> = props => (
  <ErrorBoundary
    FallbackComponent={AppCrashFallback}
    hasError={props.hasError}
    eventId={props.errorEventId}
  >
    <IntlProvider locale="en" messages={locales.en}>
      <CSSResets />
      {props.children}
    </IntlProvider>
  </ErrorBoundary>
);
