import { getTouristicContentDetails } from 'modules/touristicContent/connector';
import { TouristicContentDetails } from 'modules/touristicContent/interface';
import { isUrlString } from 'modules/utils/string';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isRessourceMissing } from 'services/routeUtils';
import { useRouter } from 'next/router';
import { ONE_DAY } from 'services/constants/staleTime';
import { routes } from 'services/routes';
import useSectionsReferences from 'hooks/useSectionsReferences';
import { queryCommonDictionaries } from 'modules/dictionaries/api';
import { DetailsSections } from '../details/useDetails';
import { getDetailsConfig } from '../details/config';

export const useTouristicContent = (
  touristicContentUrl: string | string[] | undefined,
  language: string,
) => {
  const isTouristicContentUrlString = isUrlString(touristicContentUrl);

  const id = isTouristicContentUrlString ? touristicContentUrl.split('-')[0] : '';
  const path = isTouristicContentUrlString ? decodeURI(touristicContentUrl) : '';
  const router = useRouter();

  const commonDictionaries = queryCommonDictionaries(language);

  const { data, refetch, isLoading } = useQuery<TouristicContentDetails, Error>(
    ['touristicContentDetails', id, language],
    () => getTouristicContentDetails(id, language, commonDictionaries),
    {
      enabled: isTouristicContentUrlString && commonDictionaries !== undefined,
      onError: error => {
        if (isRessourceMissing(error)) {
          void router.push(routes.HOME);
        }
      },
      staleTime: ONE_DAY,
    },
  );

  const { sections } = getDetailsConfig(language);
  const sectionsTouristicContent = sections.touristicEvent.filter(
    ({ display }) => display === true,
  );

  const { sectionsReferences, sectionsPositions, useSectionReferenceCallback } =
    useSectionsReferences();

  const sectionRef = sectionsTouristicContent.reduce(
    (list, item) => ({ ...list, [item.name]: useSectionReferenceCallback(item.name) }),
    {} as Record<DetailsSections, (node: HTMLDivElement | null) => void>,
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
    sectionsReferences,
    sectionsPositions,
    sectionRef,
  };
};
