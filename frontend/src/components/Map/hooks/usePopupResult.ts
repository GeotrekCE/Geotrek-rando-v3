import { useQuery } from '@tanstack/react-query';

import { getTrekPopupResult } from 'modules/trekResult/connector';
import { PopupResult } from 'modules/trekResult/interface';
import { getTouristicContentPopupResult } from 'modules/touristicContent/connector';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { CommonDictionaries } from 'modules/dictionaries/interface';
import { getCommonDictionaries } from 'modules/dictionaries/connector';
import { ONE_DAY } from 'services/constants/staleTime';
import { getTouristicEventPopupResult } from '../../../modules/touristicEvent/connector';
import { getOutdoorSitePopupResult } from '../../../modules/outdoorSite/connector';

export const usePopupResult = (
  id: string,
  shouldFetch: boolean,
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT',
) => {
  const language = useRouter().locale ?? getDefaultLanguage();

  const { data: commonDictionaries } = useQuery<CommonDictionaries, Error>(
    ['commonDictionaries', language],
    () => getCommonDictionaries(language),
    {
      staleTime: ONE_DAY / 2,
    },
  );

  const fetchData = () => {
    if (type === 'TREK') return getTrekPopupResult(id, language);
    if (type === 'TOURISTIC_CONTENT')
      return getTouristicContentPopupResult(id, language, commonDictionaries);
    if (type === 'OUTDOOR_SITE') return getOutdoorSitePopupResult(id, language, commonDictionaries);
    if (type === 'TOURISTIC_EVENT')
      return getTouristicEventPopupResult(id, language, commonDictionaries);

    throw new Error('Incorrect type');
  };

  const { data: trekPopupResult, isLoading } = useQuery<PopupResult, Error>(
    ['popupResult', id, language],
    fetchData,
    { enabled: shouldFetch && commonDictionaries !== undefined },
  );

  return {
    trekPopupResult,
    isLoading,
  };
};
