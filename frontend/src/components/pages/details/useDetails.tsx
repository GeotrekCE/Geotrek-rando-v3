import { useQuery } from 'react-query';
import { Details } from 'modules/details/interface';
import { getDetails } from 'modules/details/connector';

const isUrlString = (url: string | string[] | undefined): url is string =>
  url !== undefined && typeof url === 'string';

export const useDetails = (detailsUrl: string | string[] | undefined) => {
  const id = isUrlString(detailsUrl) ? detailsUrl.split('-')[1] : '';
  const { data } = useQuery<Details, Error>('details', () => getDetails(id), {
    enabled: isUrlString(detailsUrl),
  });
  return { details: data };
};
