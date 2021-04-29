import Head from 'next/head';
import { getGlobalConfig } from 'modules/utils/api.config';
import { getDefaultLanguage } from 'modules/header/utills';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

interface Props {
  title?: string;
  description?: string;
  sharingImageUrl?: string;
}

export const PageHead = ({ title, description, sharingImageUrl }: Props) => {
  const { baseUrl, applicationName } = getGlobalConfig();
  const router = useRouter();
  const currentLanguage = router.locale ?? getDefaultLanguage();
  const intl = useIntl();
  const titleWithSiteName =
    title !== undefined
      ? title.includes(intl.formatMessage({ id: 'home.title' }))
        ? title
        : `${title} - ${intl.formatMessage({ id: 'home.title' })}`
      : intl.formatMessage({ id: 'home.title' });

  return (
    <Head>
      <title>{titleWithSiteName}</title>
      {description !== undefined && <meta name="description" content={description} />}
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta property="og:title" content={title ?? intl.formatMessage({ id: 'home.title' })} />
      {description !== undefined && <meta name="og:description" content={description} />}
      <meta property="og:site_name" content={applicationName} />
      <meta property="og:url" content={`${baseUrl}/${currentLanguage}${router.asPath}`} />
      <meta property="og:locale" content={currentLanguage} />
      <meta property="og:image" content={sharingImageUrl ?? '/medias/favicon.png'} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={`${baseUrl}/${currentLanguage}${router.asPath}`} />
      <meta name="twitter:title" content={title ?? intl.formatMessage({ id: 'home.title' })} />
      {description !== undefined && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={sharingImageUrl ?? '/medias/favicon.png'} />
    </Head>
  );
};
