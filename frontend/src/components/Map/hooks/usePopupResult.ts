import { useQuery } from '@tanstack/react-query';

import { getTrekPopupResult } from 'modules/trekResult/connector';
import { PopupResult } from 'modules/trekResult/interface';
import { getTouristicContentPopupResult } from 'modules/touristicContent/connector';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { getOutdoorSitePopupResult } from '../../../modules/outdoorSite/connector';
import { getTouristicEventPopupResult } from '../../../modules/touristicEvent/connector';

export const usePopupResult = (
  id: string,
  shouldFetch: boolean,
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT',
) => {
  const language = useRouter().locale ?? getDefaultLanguage();

  const fetchData = () => {
    if (type === 'TREK') return getTrekPopupResult(id, language);
    if (type === 'TOURISTIC_CONTENT') return getTouristicContentPopupResult(id, language);
    if (type === 'OUTDOOR_SITE') return getOutdoorSitePopupResult(id, language);
    if (type === 'TOURISTIC_EVENT') return getTouristicEventPopupResult(id, language);

    throw new Error('Incorrect type');
  };

  const { data: trekPopupResult, isLoading } = useQuery<PopupResult, Error>(
    ['popupResult', id, language],
    fetchData,
    { enabled: shouldFetch },
  );

  return {
    trekPopupResult,
    isLoading,
  };
};
