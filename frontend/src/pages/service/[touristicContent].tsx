import { GetServerSideProps, NextPage } from 'next';
import router, { useRouter } from 'next/router';
import { TouristicContentUI } from 'components/pages/touristicContent';
import { getDefaultLanguage } from 'modules/header/utills';
import { dehydrate, QueryCache, QueryClient } from '@tanstack/react-query';
import { routes } from 'services/routes';
import { getCommonDictionaries } from 'modules/dictionaries/connector';
import { isRessourceMissing } from 'services/routeUtils';
import { getTouristicContentDetails } from '../../modules/touristicContent/connector';
import { isUrlString } from '../../modules/utils/string';
import { redirectIfWrongUrl } from '../../modules/utils/url';
import Custom404 from '../404';

export const getServerSideProps: GetServerSideProps = async context => {
  const id = isUrlString(context.query.touristicContent)
    ? context.query.touristicContent.split('-')[0]
    : '';
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
    const commonDictionaries = await queryClient.fetchQuery({
      queryKey: ['commonDictionaries', locale],
      queryFn: () => getCommonDictionaries(locale),
    });

    const details = await getTouristicContentDetails(id, locale, commonDictionaries);
    await queryClient.prefetchQuery({
      queryKey: ['touristicContentDetails', id, locale],
      queryFn: () => details,
    });

    const redirect = redirectIfWrongUrl(
      id,
      details.name,
      { ...context, locale },
      routes.TOURISTIC_CONTENT,
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

const TouristicContent: NextPage<Props> = ({ errorCode }) => {
  const { query, locale } = useRouter();
  const { touristicContent } = query;
  const language = locale ?? getDefaultLanguage();

  if (errorCode === 404) return <Custom404 />;

  return <TouristicContentUI touristicContentUrl={touristicContent} language={language} />;
};

export default TouristicContent;
