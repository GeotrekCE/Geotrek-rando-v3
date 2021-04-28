import Head from 'next/head';
import { getGlobalConfig } from 'modules/utils/api.config';
import { getDefaultLanguage } from 'modules/header/utills';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
  description?: string;
}

export const PageHead = ({ title, description }: Props) => {
  const { baseUrl, applicationName } = getGlobalConfig();
  const router = useRouter();
  const currentLanguage = router.locale ?? getDefaultLanguage();

  return (
    <Head>
      <title>{title ?? 'GeoTrek'}</title>
      {description !== undefined && <meta name="description" content={description} />}
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta property="og:title" content={title ?? applicationName} />
      {description !== undefined && <meta name="og:description" content={description} />}
      <meta property="og:site_name" content={applicationName} />
      <meta property="og:url" content={`${baseUrl}/${currentLanguage}${router.asPath}`} />
      <meta property="og:locale" content={currentLanguage} />
      <meta property="og:image" content="/medias/favicon.png" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={`${baseUrl}/${currentLanguage}${router.asPath}`} />
      <meta name="twitter:title" content={title ?? applicationName} />
      {description !== undefined && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content="/medias/favicon.png" />
    </Head>
  );
};
