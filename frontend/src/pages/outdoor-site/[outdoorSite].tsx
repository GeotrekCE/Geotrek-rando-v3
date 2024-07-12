import { OutdoorSiteUI } from 'components/pages/site';
import { GetServerSideProps, NextPage } from 'next';
import router, { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { dehydrate, QueryCache, QueryClient } from '@tanstack/react-query';
import { routes } from 'services/routes';
import { getCommonDictionaries } from 'modules/dictionaries/connector';
import { isRessourceMissing } from 'services/routeUtils';
import { getOutdoorSiteDetails } from '../../modules/outdoorSite/connector';
import { isUrlString } from '../../modules/utils/string';
import { redirectIfWrongUrl } from '../../modules/utils/url';
import Custom404 from '../404';

export const getServerSideProps: GetServerSideProps = async context => {
  const id = isUrlString(context.query.outdoorSite) ? context.query.outdoorSite.split('-')[0] : '';
  const { locale = 'fr' } = context;

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: error => {
        if (isRessourceMissing(error)) {
          void router.push(routes.HOME);
        }
      },
    }),
  });

  try {
    const commonDictionaries = await getCommonDictionaries(locale);
    await queryClient.prefetchQuery({
      queryKey: ['commonDictionaries', locale],
      queryFn: () => commonDictionaries,
    });

    const details = await getOutdoorSiteDetails(id, locale, commonDictionaries);
    await queryClient.prefetchQuery({
      queryKey: ['outdoorSiteDetails', id, locale],
      queryFn: () => details,
    });

    const redirect = redirectIfWrongUrl(
      id,
      details.name,
      { ...context, locale },
      routes.OUTDOOR_SITE,
    );
    if (redirect)
      return {
        redirect,
      };

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      props: {
        errorCode: String(error).includes('NOT_FOUND') ? 404 : 500,
      },
    };
  }
};

interface Props {
  errorCode?: number;
}

const OutdoorSite: NextPage<Props> = ({ errorCode }) => {
  const { query, locale } = useRouter();
  const { outdoorSite } = query;
  const language = locale ?? getDefaultLanguage();

  if (errorCode === 404) return <Custom404 />;

  return <OutdoorSiteUI outdoorSiteUrl={outdoorSite} language={language} />;
};

export default OutdoorSite;
