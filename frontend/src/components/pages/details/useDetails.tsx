import { useQuery } from 'react-query';
import { Details } from 'modules/details/interface';
import { getDetails } from 'modules/details/connector';
import { useRef } from 'react';

const isUrlString = (url: string | string[] | undefined): url is string =>
  url !== undefined && typeof url === 'string';
export interface DetailsHeaderSection {
  preview?: HTMLDivElement | null;
  poi?: HTMLDivElement | null;
  description?: HTMLDivElement | null;
  practicalInformations?: HTMLDivElement | null;
  accessibility?: HTMLDivElement | null;
  touristicContent?: HTMLDivElement | null;
}

export const useDetails = (detailsUrl: string | string[] | undefined) => {
  const id = isUrlString(detailsUrl) ? detailsUrl.split('-')[1] : '';
  const { data, refetch, isLoading } = useQuery<Details, Error>('details', () => getDetails(id), {
    enabled: isUrlString(detailsUrl),
  });

  const sectionsReferences = useRef<DetailsHeaderSection>({});

  return { details: data, refetch, isLoading, sectionsReferences };
};
