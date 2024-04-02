import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { FlatPageUI } from 'components/pages/flatPage';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { routes } from 'services/routes';
import { getCommonDictionaries } from 'modules/dictionaries/connector';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';
import { getFlatPageDetails } from 'modules/flatpage/connector';
import { getSuggestionsFromContent } from 'modules/flatpage/utils';
import { isUrlString } from 'modules/utils/string';
import { redirectIfWrongUrl } from 'modules/utils/url';
import Custom404 from '../404';

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const id = isUrlString(context.query.flatPage) ? context.query.flatPage.split('-')[0] : '';
    const { locale = 'fr' } = context;

    const queryClient = new QueryClient();

    const commonDictionaries = await getCommonDictionaries(locale);
    await queryClient.prefetchQuery(['commonDictionaries', locale], () => commonDictionaries);

    const details = await getFlatPageDetails(id, locale, commonDictionaries);
    await queryClient.prefetchQuery(['flatPageDetails', id, locale], () => details);

    const suggestions = getSuggestionsFromContent(details.content);

    const activitySuggestionIds = suggestions.flatMap(suggestion =>
      'ids' in suggestion ? suggestion.ids : [suggestion.type],
    );

    await queryClient.prefetchQuery(
      ['activitySuggestions', `Suggestion-${activitySuggestionIds.join('-')}-page-${id}`, locale],
      () => getActivitySuggestions(suggestions, locale, commonDictionaries),
    );

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
  const router = useRouter();
  const { flatPage } = router.query;

  if (errorCode === 404 || flatPage === undefined) return <Custom404 />;

  return <FlatPageUI flatPageUrl={String(flatPage)} />;
};

export default TouristicContent;
