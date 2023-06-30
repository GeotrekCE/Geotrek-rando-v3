import { useState } from 'react';
import { isUrlString } from 'modules/utils/string';
import { useQuery } from '@tanstack/react-query';
import useSectionsReferences from 'hooks/useSectionsReferences';
import { getTouristicEventDetails } from '../../../modules/touristicEvent/connector';
import { TouristicEventDetails } from '../../../modules/touristicEvent/interface';
import { getDetailsConfig } from '../details/config';
import { DetailsSections } from '../details/useDetails';

export const useTouristicEvent = (
  touristicEventUrl: string | string[] | undefined,
  language: string,
) => {
  const id = isUrlString(touristicEventUrl) ? touristicEventUrl.split('-')[0] : '';
  const path = isUrlString(touristicEventUrl) ? decodeURI(touristicEventUrl) : '';
  const { data, refetch, isLoading } = useQuery<TouristicEventDetails, Error>(
    ['outdoorCourseDetails', id, language],
    () => getTouristicEventDetails(id, language),
    {
      enabled: isUrlString(touristicEventUrl),
    },
  );

  const { sections } = getDetailsConfig();
  const sectionsTouristicEvent = sections.touristicEvent.filter(({ display }) => display === true);

  const { sectionsReferences, sectionsPositions, useSectionReferenceCallback } =
    useSectionsReferences();

  const sectionRef = sectionsTouristicEvent.reduce(
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
    path,
    sectionsReferences,
    sectionsPositions,
    sectionRef,
  };
};
