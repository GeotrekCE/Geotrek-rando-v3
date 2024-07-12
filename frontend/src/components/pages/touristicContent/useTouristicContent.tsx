import { getTouristicContentDetails } from 'modules/touristicContent/connector';
import { TouristicContentDetails } from 'modules/touristicContent/interface';
import { isUrlString } from 'modules/utils/string';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ONE_DAY } from 'services/constants/staleTime';
import useSectionsReferences from 'hooks/useSectionsReferences';
import { useQueryCommonDictionaries } from 'modules/dictionaries/api';
import { DetailsSections } from '../details/useDetails';
import { getDetailsConfig } from '../details/config';

export const useTouristicContent = (
  touristicContentUrl: string | string[] | undefined,
  language: string,
) => {
  const isTouristicContentUrlString = isUrlString(touristicContentUrl);

  const id = isTouristicContentUrlString ? touristicContentUrl.split('-')[0] : '';
  const path = isTouristicContentUrlString ? decodeURI(touristicContentUrl) : '';

  const commonDictionaries = useQueryCommonDictionaries(language);

  const { data, refetch, isLoading } = useQuery<TouristicContentDetails, Error>({
    queryKey: ['touristicContentDetails', id, language],
    queryFn: () => getTouristicContentDetails(id, language, commonDictionaries),
    enabled: isTouristicContentUrlString && commonDictionaries !== undefined,
    staleTime: ONE_DAY,
  });

  const { sections } = getDetailsConfig(language);
  const sectionsTouristicContent = sections.touristicEvent.filter(
    ({ display }) => display === true,
  );

  const { sectionsReferences, sectionsPositions, useSectionReferenceCallback } =
    useSectionsReferences();

  const sectionRef = sectionsTouristicContent.reduce(
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
