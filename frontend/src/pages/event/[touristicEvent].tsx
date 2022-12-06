import { TouristicEventUI } from 'components/pages/touristicEvent/TouristicEventUI';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { routes } from 'services/routes';
import { redirectIfWrongUrl } from 'modules/utils/url';
import { getTouristicEventDetails } from '../../modules/touristicEvent/connector';
import { isUrlString } from '../../modules/utils/string';
import Custom404 from '../404';

export const getServerSideProps: GetServerSideProps = async context => {
  const id = isUrlString(context.query.touristicEvent)
    ? context.query.touristicEvent.split('-')[0]
    : '';
  const { locale = 'fr' } = context;

  const queryClient = new QueryClient();
  try {
    const details = await getTouristicEventDetails(id, locale);

    await queryClient.prefetchQuery(['touristicEventDetails', id, locale], () => details);

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
  const router = useRouter();
  const { touristicEvent } = router.query;
  const language = router.locale ?? getDefaultLanguage();

  if (errorCode === 404) return <Custom404 />;

  return <TouristicEventUI touristicEventUrl={touristicEvent} language={language} />;
};

export default TouristicEvent;
