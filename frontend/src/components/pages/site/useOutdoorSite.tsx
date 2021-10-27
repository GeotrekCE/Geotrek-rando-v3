import { isUrlString } from 'modules/utils/string';
import { useState } from 'react';
import { useQuery } from 'react-query';
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
    },
  );
  const [mobileMapState, setMobileMapState] = useState<'DISPLAYED' | 'HIDDEN'>('HIDDEN');
  const displayMobileMap = () => setMobileMapState('DISPLAYED');
  const hideMobileMap = () => setMobileMapState('HIDDEN');
  return {
    id,
    outdoorSiteContent: data,
    refetch,
    isLoading,
    mobileMapState,
    displayMobileMap,
    hideMobileMap,
    path,
  };
};
