import { useRouter } from 'next/router';
import { DetailsUI } from 'components/pages/details';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getDetails, getTrekChildren } from 'modules/details/connector';
import { isUrlString } from 'modules/utils/string';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = async (context: {
  query: { detailsId: string | string[] | undefined; parentId: string | string[] | undefined };
}) => {
  const id = isUrlString(context.query.detailsId) ? context.query.detailsId.split('-')[1] : '';
  const parentIdString = isUrlString(context.query.parentId) ? context.query.parentId : '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(`details-${id}`, () => getDetails(id));
  await queryClient.prefetchQuery(`trekFamily-${parentIdString}`, () =>
    getTrekChildren(parentIdString),
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

  return <DetailsUI detailsId={detailsId} parentId={parentId} />;
};

export default Details;
