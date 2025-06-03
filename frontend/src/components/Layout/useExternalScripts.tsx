import getNextConfig from 'next/config';
import parse from 'html-react-parser';
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect';
import { ReactElement } from 'react';
import { useIntl } from 'react-intl';
import { getGlobalConfig } from 'modules/utils/api.config';
import { uniqBy } from 'modules/utils/array';
import { merge } from 'ts-deepmerge';

const {
  publicRuntimeConfig: { scriptsHeaderHtml = '', scriptsFooterHtml = '', locales },
} = getNextConfig();

const orejimeConfig = (
  consentList: { name: string; title: string; cookies: string; purposes: string }[],
  locale: string,
  privacyPolicyLink: string | null,
) => {
  if (!consentList?.length) {
    return null;
  }
  const consentsTranslations = Object.entries(locales[locale] as { [key: string]: string })
    .filter(([key]) => key.startsWith('consents.modal'))
    .map(([key, value]) => {
      const tempObject = {};
      let obj = tempObject as any;
      key
        .split('.')
        .slice(2)
        .forEach((item, index, array) => {
          obj = obj[item] = index === array.length - 1 ? value : {};
        });
      return tempObject;
    });

  return {
    appElement: '#__next',
    privacyPolicy: privacyPolicyLink,
    lang: locale,
    translations: {
      [locale]: merge(...consentsTranslations),
    },
    apps: consentList.flatMap(({ name, title, cookies, purposes }) => [
      {
        name,
        title,
        cookies: cookies?.split(',').map(item => new RegExp(item)) ?? [],
        ...(purposes?.length ? { purposes: purposes?.split(',') } : {}),
      },
    ]),
  };
};

export const useExternalsScripts = (executeOnLoad = false) => {
  const { googleAnalyticsId, privacyPolicyLink } = getGlobalConfig();

  const scriptsGA =
    googleAnalyticsId !== null
      ? `
<script
  type="opt-in"
  data-type="application/javascript"
  data-title="Google Tag Manager"
  data-name="google-tag-manager"
  data-purposes="analytics"
  data-cookies="^_ga,^_gat,^_gid,^__utma,^__utmb,^__utmc,^__utmt,^__utmz"
  data-src="https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}"
 ></script>
<script
  type="opt-in"
  data-type="application/javascript"
  data-name="google-tag-manager"
>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${googleAnalyticsId}');

    window.next.router.events.on('routeChangeComplete', function(url) {
      (function(allowsGTMCookies) {
        window['ga-disable-${googleAnalyticsId}'] = !allowsGTMCookies;
        if (allowsGTMCookies) {
          window.dataLayer.push({
            event: "pageview",
            page: url,
          })
        }
      })(JSON.parse(new URLSearchParams(document.cookie.replaceAll('; ', '&')).get('orejime') ?? null)?.["google-tag-manager"]);
    });
  </script>
  `
      : '';

  const scriptsHeader = parse(`${scriptsGA}${scriptsHeaderHtml as string}`) as ReactElement[];
  const scriptsFooter = parse(scriptsFooterHtml as string) as ReactElement[];
  const { locale } = useIntl();

  const consentList = uniqBy(
    [scriptsHeader, scriptsFooter].flat().flatMap(({ props }) => [
      {
        name: props?.['data-name'],
        title: props?.['data-title'] ?? props?.['data-name'],
        cookies: props?.['data-cookies'] ?? '',
        purposes: props?.['data-purposes'],
      },
    ]),
    'name',
  ).filter(({ name }) => Boolean(name));

  const needsConsent = Boolean(consentList.length);

  async function showModal() {
    try {
      // @ts-expect-error the lib is not typed
      const Orejime = await import('orejime');
      const { show } = Orejime.init(orejimeConfig(consentList, locale, privacyPolicyLink));
      if (!executeOnLoad) {
        show();
      }
    } catch (e) {
      console.error('Error occured while loading consent modal:', e);
      return;
    }
  }

  function triggerConsentModal() {
    if (!privacyPolicyLink || !needsConsent) {
      return;
    }
    void showModal();
  }

  useIsomorphicLayoutEffect(() => {
    if (executeOnLoad && typeof window !== 'undefined') {
      triggerConsentModal();
    }
  }, [executeOnLoad, locale, privacyPolicyLink]);

  return {
    needsConsent: needsConsent && Boolean(privacyPolicyLink),
    scriptsHeader,
    scriptsFooter,
    triggerConsentModal,
  };
};
