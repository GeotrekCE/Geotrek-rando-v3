import { getFlatPageDetails } from 'modules/flatpage/connector';
import { FlatPageDetails } from 'modules/flatpage/interface';
import { isUrlString } from 'modules/utils/string';
import { useQuery } from 'react-query';

export const useFlatPage = (flatPageUrl: string | string[] | undefined) => {
  const id = isUrlString(flatPageUrl) ? flatPageUrl.split('-')[0] : '';
  const { data, refetch, isLoading } = useQuery<FlatPageDetails, Error>(
    `flatPageDetails-${id}`,
    () => getFlatPageDetails(id),
    {
      enabled: isUrlString(flatPageUrl),
    },
  );
  return { id, flatPage: data, refetch, isLoading };
};
