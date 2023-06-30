import useSectionsReferences from 'hooks/useSectionsReferences';
import { isUrlString } from 'modules/utils/string';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ONE_DAY } from 'services/constants/staleTime';
import { getOutdoorSiteDetails } from '../../../modules/outdoorSite/connector';
import { OutdoorSiteDetails } from '../../../modules/outdoorSite/interface';
import { getDetailsConfig } from '../details/config';
import { DetailsSections } from '../details/useDetails';

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

  const { sections } = getDetailsConfig();

  const sectionsOutdoorSite = sections.outdoorSite.filter(({ display }) => display === true);

  const { sectionsReferences, sectionsPositions, useSectionReferenceCallback } =
    useSectionsReferences();

  const sectionRef = sectionsOutdoorSite.reduce(
    (list, item) => ({ ...list, [item.name]: useSectionReferenceCallback(item.name) }),
    {} as Record<DetailsSections, (node: HTMLDivElement | null) => void>,
  );

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
    sectionRef,
  };
};
