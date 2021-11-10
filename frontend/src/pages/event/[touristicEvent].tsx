import { TouristicEventUI } from 'components/pages/touristicEvent/TouristicEventUI';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { QueryClient } from 'react-query';
import { routes } from 'services/routes';
import { redirectIfWrongUrl } from 'modules/utils/url';
import { getTouristicEventDetails } from '../../modules/touristicEvent/connector';
import { isUrlString } from '../../modules/utils/string';
import Custom404 from '../404';

export const getServerSideProps = async (context: {
  locale: string;
  query: { touristicEvent: string };
  res: any;
  req: any;
}) => {
  try {
    const id = isUrlString(context.query.touristicEvent)
      ? context.query.touristicEvent.split('-')[0]
      : '';

    const queryClient = new QueryClient();

    const details = await getTouristicEventDetails(id, context.locale);

    await queryClient.prefetchQuery(`touristicEventDetails-${id}-${context.locale}`, () => details);

    redirectIfWrongUrl(id, details.name, context, routes.TOURISTIC_EVENT);

    return { props: {} };
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
