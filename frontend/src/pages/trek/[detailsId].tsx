import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { DetailsUI } from 'components/pages/details';
import { useEffect } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getDetails, getTrekFamily } from 'modules/details/connector';
import { isUrlString } from 'modules/utils/string';
import { getDefaultLanguage } from 'modules/header/utills';
import { routes } from 'services/routes';
import { redirectIfWrongUrl } from '../../modules/utils/url';
import Custom404 from '../404';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = async (context: {
  locale: string;
  resolvedUrl: string;
  query: { detailsId: string | undefined; parentId: string | undefined };
  res: any;
  req: any;
}) => {
  const id = isUrlString(context.query.detailsId) ? context.query.detailsId.split('-')[0] : '';
  const parentIdString = isUrlString(context.query.parentId) ? context.query.parentId : '';

  const queryClient = new QueryClient();

  try {
    const details = await getDetails(id, context.locale);

    await queryClient.prefetchQuery(`details-${id}-${context.locale}`, () => details);
    await queryClient.prefetchQuery(`trekFamily-${parentIdString}-${context.locale}`, () =>
      getTrekFamily(parentIdString, context.locale),
    );

    const redirect = redirectIfWrongUrl(
      id,
      details.title,
      context,
      routes.DETAILS,
      Number(parentIdString),
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

const Details: NextPage<Props> = ({ errorCode }) => {
  const router = useRouter();
  const { detailsId, parentId } = router.query;
  const language = router.locale ?? getDefaultLanguage();

  useEffect(() => {
    // Force to scroll top on page refresh
    window.history.scrollRestoration = 'manual';
  }, []);

  if (errorCode === 404) return <Custom404 />;

  return <DetailsUI detailsId={detailsId} parentId={parentId} language={language} />;
};

export default Details;
