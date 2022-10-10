import { SearchUI } from 'components/pages/search';
import { parseFilters } from 'components/pages/search/utils';
import { getInitialFilters } from 'modules/filters/connector';
import { getFiltersState } from 'modules/filters/utils';
import { getDefaultLanguage } from 'modules/header/utills';
import { getSearchResults } from 'modules/results/connector';
import { GetServerSideProps } from 'next';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import { getGlobalConfig } from '../modules/utils/api.config';

const sanitizeState = (unsafeState: DehydratedState): DehydratedState =>
  JSON.parse(JSON.stringify(unsafeState));

export const getServerSideProps: GetServerSideProps = async context => {
  const { locale = 'fr' } = context;
  const queryClient = new QueryClient();
  const initialFiltersState = await getFiltersState(locale);
  const parsedInitialFiltersState = parseFilters(initialFiltersState);
  const initialTextFilter = context.query.text?.toString() ?? null;

  await queryClient.prefetchQuery(['initialFilterState', locale], () =>
    getInitialFilters(locale, context.query),
  );

  await queryClient.prefetchInfiniteQuery(
    ['trekResults', parsedInitialFiltersState, context.locale],
    () =>
      getSearchResults(
        {
          filtersState: parsedInitialFiltersState,
          textFilterState: initialTextFilter,
          bboxState: null,
          dateFilter: null,
        },
        {
          treks: 1,
          touristicContents: 1,
          outdoorSites: getGlobalConfig().enableOutdoor ? 1 : null,
          touristicEvents: getGlobalConfig().enableTouristicEvents ? 1 : null,
        },
        locale,
      ),
  );

  const unsafeState = dehydrate(queryClient);
  const safeState = sanitizeState(unsafeState);

  return {
    props: {
      dehydratedState: safeState,
      language: locale ?? getDefaultLanguage(),
    },
  };
};

export default SearchUI;
