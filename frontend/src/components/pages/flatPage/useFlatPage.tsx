import { getFlatPageDetails } from 'modules/flatpage/connector';
import { FlatPageDetails } from 'modules/flatpage/interface';
import { getDefaultLanguage } from 'modules/header/utills';
import { isUrlString } from 'modules/utils/string';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export const useFlatPage = (flatPageUrl: string | string[] | undefined) => {
  const language = useRouter().locale ?? getDefaultLanguage();
  const id = isUrlString(flatPageUrl) ? flatPageUrl.split('-')[0] : '';
  const { data, refetch, isLoading, error } = useQuery<FlatPageDetails, Error>(
    ['flatPageDetails', id, language],
    () => getFlatPageDetails(id, language),
    {
      enabled: isUrlString(flatPageUrl),
    },
  );
  return { id, flatPage: data, refetch, isLoading, error };
};
