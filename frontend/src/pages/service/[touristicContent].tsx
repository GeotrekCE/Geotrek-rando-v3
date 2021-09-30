import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { TouristicContentUI } from 'components/pages/touristicContent';
import { getDefaultLanguage } from 'modules/header/utills';
import { QueryClient } from 'react-query';
import { routes } from 'services/routes';
import { getTouristicContentDetails } from '../../modules/touristicContent/connector';
import { isUrlString } from '../../modules/utils/string';
import { redirectIfWrongUrl } from '../../modules/utils/url';
import Custom404 from '../404';

export const getServerSideProps = async (context: {
  locale: string;
  query: { touristicContent: string };
  res: any;
  req: any;
}) => {
  try {
    const id = isUrlString(context.query.touristicContent)
      ? context.query.touristicContent.split('-')[0]
      : '';

    const queryClient = new QueryClient();

    const details = await getTouristicContentDetails(id, context.locale);

    await queryClient.prefetchQuery(
      `touristicContentDetails-${id}-${context.locale}`,
      () => details,
    );

    redirectIfWrongUrl(id, details.name, context, routes.TOURISTIC_CONTENT);

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

const TouristicContent: NextPage<Props> = ({ errorCode }) => {
  const router = useRouter();
  const { touristicContent } = router.query;
  const language = router.locale ?? getDefaultLanguage();

  if (errorCode === 404) return <Custom404 />;

  return <TouristicContentUI touristicContentUrl={touristicContent} language={language} />;
};

export default TouristicContent;
