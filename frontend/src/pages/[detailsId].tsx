import { useRouter } from 'next/router';
import { DetailsUI } from 'components/pages/details';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getDetails } from 'modules/details/connector';
import { isUrlString } from 'modules/utils/string';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = async (context: {
  query: { detailsId: string | string[] | undefined };
}) => {
  const id = isUrlString(context.query.detailsId) ? context.query.detailsId.split('-')[1] : '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(`details-${id}`, () => getDetails(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Details = () => {
  const router = useRouter();
  const { detailsId } = router.query;

  return <DetailsUI detailsId={detailsId} />;
};

export default Details;
