import { AppCrashFallback } from 'components/AppCrashFallback';
import Head from 'next/head';
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
      <Head>
        <link rel="manifest" href="/manifest.json" />

        <meta name="application-name" content="Geotrek-rando" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Geotrek-rando" />
        <meta name="description" content="Geotrek rando" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png" />
        <link rel="mask-icon" href="/images/logo.png" color="#5bbad5" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        {/* <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="localhost" />
        <meta name="twitter:title" content="Geotrek-rando" />
        <meta name="twitter:description" content="Geotrek rando" />
        <meta name="twitter:image" content="/images/logo.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Geotrek-rando" />
        <meta property="og:description" content="Geotrek rando" />
        <meta property="og:site_name" content="Geotrek-rando" />
        <meta property="og:url" content="localhost" />
        <meta property="og:image" content="/images/logo.png" /> */}

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <CSSResets />
      {props.children}
    </IntlProvider>
  </ErrorBoundary>
);
