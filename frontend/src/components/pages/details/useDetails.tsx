import { useQuery } from 'react-query';
import { Details } from 'modules/details/interface';
import { getDetails } from 'modules/details/connector';

export const useDetails = (id: string) => {
  const { data } = useQuery<Details, Error>('details', () => getDetails(id));
  return { details: data };
};
