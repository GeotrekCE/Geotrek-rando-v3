import { useQuery } from '@tanstack/react-query';
import { ONE_DAY } from 'services/constants/staleTime';
import { CommonDictionaries } from './interface';
import { getCommonDictionaries } from './connector';

export const useQueryCommonDictionaries = (language: string) => {
  const { data } = useQuery<CommonDictionaries, Error>({
    queryKey: ['commonDictionaries', language],
    queryFn: () => getCommonDictionaries(language),
    staleTime: ONE_DAY / 2,
  });
  return data;
};
