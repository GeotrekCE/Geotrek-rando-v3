import { useQuery } from '@tanstack/react-query';

import { getTrekPopupResult } from 'modules/trekResult/connector';
import { PopupResult } from 'modules/trekResult/interface';
import { getTouristicContentPopupResult } from 'modules/touristicContent/connector';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { useQueryCommonDictionaries } from 'modules/dictionaries/api';
import { getTouristicEventPopupResult } from '../../../modules/touristicEvent/connector';
import { getOutdoorSitePopupResult } from '../../../modules/outdoorSite/connector';

export const usePopupResult = (
  id: string,
  shouldFetch: boolean,
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT' | null,
) => {
  const language = useRouter().locale ?? getDefaultLanguage();
  const commonDictionaries = useQueryCommonDictionaries(language);

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
    { enabled: type !== null && shouldFetch && commonDictionaries !== undefined },
  );

  return {
    trekPopupResult,
    isLoading,
  };
};
