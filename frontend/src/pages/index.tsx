import { Home } from 'components/pages/home';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';

import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('activitySuggestions', getActivitySuggestions);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
