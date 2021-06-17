import { useRouter } from 'next/router';
import { DetailsUI } from 'components/pages/details';
import { useEffect } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getDetails, getTrekFamily } from 'modules/details/connector';
import { isUrlString } from 'modules/utils/string';
import { getDefaultLanguage } from 'modules/header/utills';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = async (context: {
  locale: string;
  query: { detailsId: string | string[] | undefined; parentId: string | string[] | undefined };
}) => {
  const id = isUrlString(context.query.detailsId) ? context.query.detailsId.split('-')[0] : '';
  const parentIdString = isUrlString(context.query.parentId) ? context.query.parentId : '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(`details-${id}-${context.locale}`, () =>
    getDetails(id, context.locale),
  );
  await queryClient.prefetchQuery(`trekFamily-${parentIdString}-${context.locale}`, () =>
    getTrekFamily(parentIdString, context.locale),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Details = () => {
  const router = useRouter();
  const { detailsId, parentId } = router.query;
  const language = router.locale ?? getDefaultLanguage();

  useEffect(() => {
    // Force to scroll top on page refresh
    window.history.scrollRestoration = 'manual';
  }, []);

  return <DetailsUI detailsId={detailsId} parentId={parentId} language={language} />;
};

export default Details;
