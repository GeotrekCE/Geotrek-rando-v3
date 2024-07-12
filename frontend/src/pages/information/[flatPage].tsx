import { GetServerSideProps, NextPage } from 'next';
import router, { useRouter } from 'next/router';
import { FlatPageUI } from 'components/pages/flatPage';
import { dehydrate, QueryCache, QueryClient } from '@tanstack/react-query';
import { routes } from 'services/routes';
import { getCommonDictionaries } from 'modules/dictionaries/connector';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { getFlatPageDetails } from 'modules/flatpage/connector';
import { getSuggestionsFromContent } from 'modules/flatpage/utils';
import { isUrlString } from 'modules/utils/string';
import { redirectIfWrongUrl } from 'modules/utils/url';
import { isRessourceMissing } from 'services/routeUtils';
import Custom404 from '../404';

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const id = isUrlString(context.query.flatPage) ? context.query.flatPage.split('-')[0] : '';
    const { locale = 'fr' } = context;

    const queryClient = new QueryClient({
      queryCache: new QueryCache({
        onError: error => {
          if (isRessourceMissing(error)) {
            void router.push(routes.HOME);
          }
        },
      }),
    });

    const commonDictionaries = await getCommonDictionaries(locale);
    await queryClient.prefetchQuery({
      queryKey: ['commonDictionaries', locale],
      queryFn: () => commonDictionaries,
    });

    const details = await getFlatPageDetails(id, locale, commonDictionaries);
    await queryClient.prefetchQuery({
      queryKey: ['flatPageDetails', id, locale],
      queryFn: () => details,
    });

    const suggestions = getSuggestionsFromContent(details.content);

    const activitySuggestionIds = suggestions.flatMap(suggestion =>
      'ids' in suggestion ? suggestion.ids : [suggestion.type],
    );

    await queryClient.prefetchQuery({
      queryKey: ['activitySuggestions', ...activitySuggestionIds, id, locale],
      queryFn: () => getActivitySuggestions(suggestions, locale, commonDictionaries),
    });

    const redirect = redirectIfWrongUrl(
      id,
      details.title,
      { ...context, locale },
      routes.FLAT_PAGE,
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

const TouristicContent: NextPage<Props> = ({ errorCode }) => {
  const { query } = useRouter();
  const { flatPage } = query;

  if (errorCode === 404 || flatPage === undefined) return <Custom404 />;

  return <FlatPageUI flatPageUrl={String(flatPage)} />;
};

export default TouristicContent;
