import { getTouristicContentDetails } from 'modules/touristicContent/connector';
import { TouristicContentDetails } from 'modules/touristicContent/interface';
import { isUrlString } from 'modules/utils/string';
import { useQuery } from 'react-query';

export const useTouristicContent = (touristicContentUrl: string | string[] | undefined) => {
  const id = isUrlString(touristicContentUrl) ? touristicContentUrl.split('-')[0] : '';
  const { data, refetch, isLoading } = useQuery<TouristicContentDetails, Error>(
    `touristicContentDetails-${id}`,
    () => getTouristicContentDetails(id),
    {
      enabled: isUrlString(touristicContentUrl),
    },
  );
  return { id, touristicContent: data, refetch, isLoading };
};
