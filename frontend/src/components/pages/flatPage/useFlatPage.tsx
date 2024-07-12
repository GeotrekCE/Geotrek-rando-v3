import { getFlatPageDetails } from 'modules/flatpage/connector';
import { FlatPageDetails } from 'modules/flatpage/interface';
import { getDefaultLanguage } from 'modules/header/utills';
import { isUrlString } from 'modules/utils/string';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { ONE_DAY } from 'services/constants/staleTime';
import { useQueryCommonDictionaries } from 'modules/dictionaries/api';
import { getSuggestionsFromContent } from 'modules/flatpage/utils';
import { ActivitySuggestion } from 'modules/activitySuggestions/interface';
import { getActivitySuggestions } from 'modules/activitySuggestions/connector';

export const useFlatPage = (flatPageUrl: string | undefined) => {
  const language = useRouter().locale ?? getDefaultLanguage();
  const path = isUrlString(flatPageUrl) ? decodeURI(flatPageUrl) : '';
  const id = isUrlString(flatPageUrl) ? flatPageUrl.split('-')[0] : '';

  const commonDictionaries = useQueryCommonDictionaries(language);

  const {
    data: flatPage,
    refetch,
    isLoading,
    error,
  } = useQuery<FlatPageDetails, Error>({
    queryKey: ['flatPageDetails', id, language],
    queryFn: () => getFlatPageDetails(id, language, commonDictionaries),
    enabled: isUrlString(flatPageUrl) && commonDictionaries !== undefined,
    staleTime: ONE_DAY,
  });
  const suggestions = getSuggestionsFromContent(flatPage?.content ?? '');

  const activitySuggestionIds = suggestions.flatMap(suggestion =>
    'ids' in suggestion ? suggestion.ids : [suggestion.type],
  );

  const { data: activitySuggestions = [] } = useQuery<ActivitySuggestion[] | [], Error>({
    queryKey: ['activitySuggestions', ...activitySuggestionIds, id, language],
    queryFn: () => getActivitySuggestions(suggestions, language, commonDictionaries),
    enabled: suggestions.length > 0 && commonDictionaries !== undefined,
  });

  return {
    id,
    flatPage,
    activitySuggestions,
    refetch,
    isLoading,
    error,
    path,
  };
};
