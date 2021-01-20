import { useQuery } from 'react-query';
import { Details, DetailsString } from 'modules/details/interface';
import { getDetails } from 'modules/details/connector';
import parse from 'html-react-parser';

const isUrlString = (url: string | string[] | undefined): url is string =>
  url !== undefined && typeof url === 'string';

export const useDetails = (detailsUrl: string | string[] | undefined) => {
  const id = isUrlString(detailsUrl) ? detailsUrl.split('-')[1] : '';
  const { data } = useQuery<Details, Error>('details', () => getDetails(id), {
    enabled: isUrlString(detailsUrl),
  });
  const checkAndParse = (
    details: Details | undefined,
    field: keyof DetailsString,
  ): [boolean, string | JSX.Element | JSX.Element[]] => {
    const isValid =
      details !== undefined && details[field] !== undefined && details[field].length > 0;
    const content = details !== undefined ? parse(details[field] ?? '') : '';
    return [isValid, content];
  };
  return { details: data, checkAndParse };
};
