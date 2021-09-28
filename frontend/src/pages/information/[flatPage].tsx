import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FlatPageUI } from 'components/pages/flatPage';
import { QueryClient } from 'react-query';
import { getFlatPageDetails } from '../../modules/flatpage/connector';
import { isUrlString } from '../../modules/utils/string';
import { redirectIfWrongUrl } from '../../modules/utils/url';
import Custom404 from '../404';

export const getServerSideProps = async (context: {
  locale: string;
  query: { flatPage: string };
  res: any;
  req: any;
}) => {
  try {
    const id = isUrlString(context.query.flatPage) ? context.query.flatPage.split('-')[0] : '';

    const queryClient = new QueryClient();

    const details = await getFlatPageDetails(id, context.locale);

    await queryClient.prefetchQuery(`flatPageDetails-${id}-${context.locale}`, () => details);

    redirectIfWrongUrl(id, details.title, context);

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
  const { flatPage } = router.query;

  if (errorCode === 404 || !flatPage) return <Custom404 />;

  return <FlatPageUI flatPageUrl={String(flatPage)} />;
};

export default TouristicContent;
