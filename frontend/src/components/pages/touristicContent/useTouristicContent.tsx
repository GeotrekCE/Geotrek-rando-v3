import { getTouristicContentDetails } from 'modules/touristicContent/connector';
import { TouristicContentDetails } from 'modules/touristicContent/interface';
import { isUrlString } from 'modules/utils/string';
import { useState } from 'react';
import { useQuery } from 'react-query';

export const useTouristicContent = (
  touristicContentUrl: string | string[] | undefined,
  language: string,
) => {
  const id = isUrlString(touristicContentUrl) ? touristicContentUrl.split('-')[0] : '';
  const { data, refetch, isLoading } = useQuery<TouristicContentDetails, Error>(
    ['touristicContentDetails', id, language],
    () => getTouristicContentDetails(id, language),
    {
      enabled: isUrlString(touristicContentUrl),
    },
  );
  const [mobileMapState, setMobileMapState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMobileMap = () => setMobileMapState('DISPLAYED');
  const hideMobileMap = () => setMobileMapState('HIDDEN');
  return {
    id,
    touristicContent: data,
    refetch,
    isLoading,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
  };
};
