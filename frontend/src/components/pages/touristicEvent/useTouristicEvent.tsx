import { useState } from 'react';
import { isUrlString } from 'modules/utils/string';
import { useQuery } from '@tanstack/react-query';
import { ONE_DAY } from 'services/constants/staleTime';
import useSectionsReferences from 'hooks/useSectionsReferences';
import { useQueryCommonDictionaries } from 'modules/dictionaries/api';
import { getTouristicEventDetails } from '../../../modules/touristicEvent/connector';
import { TouristicEventDetails } from '../../../modules/touristicEvent/interface';
import { getDetailsConfig } from '../details/config';
import { DetailsSections } from '../details/useDetails';

export const useTouristicEvent = (
  touristicEventUrl: string | string[] | undefined,
  language: string,
) => {
  const id = isUrlString(touristicEventUrl) ? touristicEventUrl.split('-')[0] : '';

  const commonDictionaries = useQueryCommonDictionaries(language);

  const { data, refetch, isLoading } = useQuery<TouristicEventDetails, Error>({
    queryKey: ['outdoorCourseDetails', id, language],
    queryFn: () => getTouristicEventDetails(id, language, commonDictionaries),
    enabled: isUrlString(touristicEventUrl) && commonDictionaries !== undefined,
    staleTime: ONE_DAY,
  });

  const { sections } = getDetailsConfig(language);
  const sectionsTouristicEvent = sections.touristicEvent.filter(({ display }) => display === true);

  const { sectionsReferences, sectionsPositions, useSectionReferenceCallback } =
    useSectionsReferences();

  const sectionRef = sectionsTouristicEvent.reduce(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (list, item) => ({ ...list, [item.name]: useSectionReferenceCallback(item.name) }),
    {} as Record<DetailsSections, (node: HTMLDivElement | null) => void>,
  );

  const [mobileMapState, setMobileMapState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMobileMap = () => setMobileMapState('DISPLAYED');
  const hideMobileMap = () => setMobileMapState('HIDDEN');

  return {
    id,
    touristicEventContent: data,
    refetch,
    isLoading,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    sectionsReferences,
    sectionsPositions,
    sectionRef,
  };
};
