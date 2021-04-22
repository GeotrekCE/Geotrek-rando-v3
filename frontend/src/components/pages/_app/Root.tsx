import { AppCrashFallback } from 'components/AppCrashFallback';
import Head from 'next/head';
import { FunctionComponent } from 'react';
import { IntlProvider } from 'react-intl';

import { getGlobalConfig } from 'modules/utils/api.config';
import { getDefaultLanguage } from 'modules/header/utills';
import { useRouter } from 'next/router';
import { colorPalette } from 'stylesheet';
import CSSResets from './CSSResets';
import { ErrorBoundary } from './ErrorBoundary';

interface RootProps {
  hasError: boolean;
  errorEventId?: string;
  messages: {
    [language: string]: {
      [messageId: string]: string;
    };
  };
}

export const Root: FunctionComponent<RootProps> = props => {
  const router = useRouter();
  const language = router.locale ?? getDefaultLanguage();
  return (
    <ErrorBoundary
      FallbackComponent={AppCrashFallback}
      hasError={props.hasError}
      eventId={props.errorEventId}
    >
      {/*@ts-ignore-next-line we ignore because locales have to be given for the config languages */}
      <IntlProvider locale={language} messages={props.messages[language] ?? props.messages.fr}>
        <Head>
          <link rel="manifest" href="/manifest.json" />

          <meta name="application-name" content={getGlobalConfig().applicationName} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content={getGlobalConfig().applicationName} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" sizes="180x180" href="/medias/favicon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/medias/favicon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/medias/favicon.png" />
          <link rel="mask-icon" href="/medias/favicon.png" color={colorPalette.primary1} />
          <link rel="shortcut icon" href="/medias/favicon.png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"
          />
          <meta
            name="google-site-verification"
            content="eKAyxwaXAobFWQcJen0mnZ8T3CpLoN45JysXeNkRf38"
          />

          {/* <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="localhost" />
        <meta name="twitter:title" content="Geotrek-rando" />
        <meta name="twitter:description" content="Geotrek rando" />
        <meta name="twitter:image" content="/medias/favicon.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Geotrek-rando" />
        <meta property="og:description" content="Geotrek rando" />
        <meta property="og:site_name" content="Geotrek-rando" />
        <meta property="og:url" content="localhost" />
        <meta property="og:image" content="/medias/favicon.png" /> */}

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
};
