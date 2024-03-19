import { getFlatPageDetails } from 'modules/flatpage/connector';
import { FlatPageDetails } from 'modules/flatpage/interface';
import { getDefaultLanguage } from 'modules/header/utills';
import { isUrlString } from 'modules/utils/string';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { ONE_DAY } from 'services/constants/staleTime';
import { useQueryCommonDictionaries } from 'modules/dictionaries/api';

export const useFlatPage = (flatPageUrl: string | undefined) => {
  const language = useRouter().locale ?? getDefaultLanguage();
  const path = isUrlString(flatPageUrl) ? decodeURI(flatPageUrl) : '';
  const id = isUrlString(flatPageUrl) ? flatPageUrl.split('-')[0] : '';

  const commonDictionaries = useQueryCommonDictionaries(language);

  const { data, refetch, isLoading, error } = useQuery<FlatPageDetails, Error>(
    ['flatPageDetails', id, language],
    () => getFlatPageDetails(id, language, commonDictionaries),
    {
      enabled: isUrlString(flatPageUrl) && commonDictionaries !== undefined,
      staleTime: ONE_DAY,
    },
  );
  return { id, flatPage: data, refetch, isLoading, error, path };
};
