import { useState } from 'react';
import { isUrlString } from 'modules/utils/string';
import { useQuery } from 'react-query';
import useSectionsReferences from 'hooks/useSectionsReferences';
import { getTouristicEventDetails } from '../../../modules/touristicEvent/connector';
import { TouristicEventDetails } from '../../../modules/touristicEvent/interface';

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

  const { sectionsReferences, sectionsPositions, useSectionReferenceCallback } =
    useSectionsReferences();

  const setPreviewRef = useSectionReferenceCallback('preview');
  const setDescriptionRef = useSectionReferenceCallback('description');
  const setPracticalInformationsRef = useSectionReferenceCallback('practicalInformations');
  const setTouristicContentsRef = useSectionReferenceCallback('touristicContent');

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
    setPreviewRef,
    setDescriptionRef,
    setPracticalInformationsRef,
    setTouristicContentsRef,
  };
};
