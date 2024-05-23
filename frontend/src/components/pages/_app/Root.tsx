import getNextConfig from 'next/config';
import Head from 'next/head';
import { IntlProvider } from 'react-intl';
import { getGlobalConfig } from 'modules/utils/api.config';
import { getDefaultLanguage } from 'modules/header/utills';
import { useRouter } from 'next/router';
import { colorPalette } from 'stylesheet';

interface Messages {
  [language: string]: {
    [messageId: string]: string;
  };
}

const {
  publicRuntimeConfig: { locales },
} = getNextConfig();

export const Root: React.FC<React.PropsWithChildren> = props => {
  const router = useRouter();
  const language: string = router.locale ?? getDefaultLanguage() ?? 'fr';
  const { googleSiteVerificationToken, applicationName } = getGlobalConfig();

  return (
    <IntlProvider locale={language} messages={(locales as Messages)[language]}>
      <Head>
        <title>{applicationName}</title>
        <link rel="manifest" href="/manifest.json" />

        <meta name="application-name" content={applicationName} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={applicationName} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" sizes="180x180" href="/medias/apple-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/medias/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/medias/favicon.png" />
        <link rel="mask-icon" href="/medias/favicon.png" color={colorPalette.primary1} />
        <link rel="shortcut icon" href="/medias/favicon.png" />
        {googleSiteVerificationToken !== null && (
          <meta name="google-site-verification" content={googleSiteVerificationToken} />
        )}

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      {props.children}
    </IntlProvider>
  );
};
