import { TouristicEventUI } from 'components/pages/touristicEvent/TouristicEventUI';
import { GetServerSideProps, NextPage } from 'next';
import router, { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { dehydrate, QueryCache, QueryClient } from '@tanstack/react-query';
import { routes } from 'services/routes';
import { redirectIfWrongUrl } from 'modules/utils/url';
import { getCommonDictionaries } from 'modules/dictionaries/connector';
import { isRessourceMissing } from 'services/routeUtils';
import { getTouristicEventDetails } from '../../modules/touristicEvent/connector';
import { isUrlString } from '../../modules/utils/string';
import Custom404 from '../404';

export const getServerSideProps: GetServerSideProps = async context => {
  const id = isUrlString(context.query.touristicEvent)
    ? context.query.touristicEvent.split('-')[0]
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

    const details = await getTouristicEventDetails(id, locale, commonDictionaries);
    await queryClient.prefetchQuery({
      queryKey: ['touristicEventDetails', id, locale],
      queryFn: () => details,
    });

    const redirect = redirectIfWrongUrl(
      id,
      details.name,
      { ...context, locale },
      routes.TOURISTIC_EVENT,
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

const TouristicEvent: NextPage<Props> = ({ errorCode }) => {
  const { query, locale } = useRouter();
  const { touristicEvent } = query;
  const language = locale ?? getDefaultLanguage();

  if (errorCode === 404) return <Custom404 />;

  return <TouristicEventUI touristicEventUrl={touristicEvent} language={language} />;
};

export default TouristicEvent;
