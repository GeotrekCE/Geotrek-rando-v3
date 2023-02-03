import { getTouristicContentDetails } from 'modules/touristicContent/connector';
import { TouristicContentDetails } from 'modules/touristicContent/interface';
import { isUrlString } from 'modules/utils/string';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isRessourceMissing } from 'services/routeUtils';
import { useRouter } from 'next/router';
import { ONE_DAY } from 'services/constants/staleTime';
import { routes } from 'services/routes';

export const useTouristicContent = (
  touristicContentUrl: string | string[] | undefined,
  language: string,
) => {
  const isTouristicContentUrlString = isUrlString(touristicContentUrl);

  const id = isTouristicContentUrlString ? touristicContentUrl.split('-')[0] : '';
  const path = isTouristicContentUrlString ? decodeURI(touristicContentUrl) : '';
  const router = useRouter();
  const { data, refetch, isLoading } = useQuery<TouristicContentDetails, Error>(
    ['touristicContentDetails', id, language],
    () => getTouristicContentDetails(id, language),
    {
      enabled: isTouristicContentUrlString,
      onError: async error => {
        if (isRessourceMissing(error)) {
          await router.push(routes.HOME);
        }
      },
      staleTime: ONE_DAY,
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
    path,
  };
};
