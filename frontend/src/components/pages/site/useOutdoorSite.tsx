import useSectionsReferences from 'hooks/useSectionsReferences';
import { isUrlString } from 'modules/utils/string';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ONE_DAY } from 'services/constants/staleTime';
import { getOutdoorSiteDetails } from '../../../modules/outdoorSite/connector';
import { OutdoorSiteDetails } from '../../../modules/outdoorSite/interface';

export const useOutdoorSite = (outdoorSiteUrl: string | string[] | undefined, language: string) => {
  const id = isUrlString(outdoorSiteUrl) ? outdoorSiteUrl.split('-')[0] : '';
  const path = isUrlString(outdoorSiteUrl) ? decodeURI(outdoorSiteUrl) : '';
  const { data, refetch, isLoading } = useQuery<OutdoorSiteDetails, Error>(
    ['outdoorSiteDetails', id, language],
    () => getOutdoorSiteDetails(id, language),
    {
      enabled: isUrlString(outdoorSiteUrl),
      staleTime: ONE_DAY,
    },
  );

  const { sectionsReferences, sectionsPositions, useSectionReferenceCallback } =
    useSectionsReferences();

  const setPreviewRef = useSectionReferenceCallback('preview');
  const setAccessRef = useSectionReferenceCallback('access');
  const setPoisRef = useSectionReferenceCallback('poi');
  const setExperienceRef = useSectionReferenceCallback('experiences');
  const setCoursesRef = useSectionReferenceCallback('courses');
  const setDescriptionRef = useSectionReferenceCallback('description');
  const setPracticalInformationsRef = useSectionReferenceCallback('practicalInformations');
  const setTouristicContentsRef = useSectionReferenceCallback('touristicContent');
  const setSensitiveAreasRef = useSectionReferenceCallback('sensitiveAreasRef');

  const [mobileMapState, setMobileMapState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMobileMap = () => setMobileMapState('DISPLAYED');
  const hideMobileMap = () => setMobileMapState('HIDDEN');

  return {
    id,
    outdoorSiteContent: data,
    refetch,
    isLoading,
    sectionsReferences,
    sectionsPositions,
    setRefForHeader: useSectionReferenceCallback,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    path,
    setPreviewRef,
    setAccessRef,
    setPoisRef,
    setExperienceRef,
    setCoursesRef,
    setDescriptionRef,
    setPracticalInformationsRef,
    setTouristicContentsRef,
    setSensitiveAreasRef,
  };
};
