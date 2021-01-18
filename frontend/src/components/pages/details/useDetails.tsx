import { useQuery } from 'react-query';
import { Details } from 'modules/details/interface';
import { getDetails } from 'modules/details/connector';

export const useDetails = (detailsUrl: string | string[] | undefined) => {
  if (detailsUrl !== undefined && typeof detailsUrl === 'string') {
    const id = detailsUrl.split('-')[1];
    const { data } = useQuery<Details, Error>('details', () => getDetails(id));
    return { details: data };
  }
  return { details: null };
};
