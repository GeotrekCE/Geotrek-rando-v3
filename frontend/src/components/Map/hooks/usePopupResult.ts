import { useQuery } from 'react-query';

import { getTrekPopupResult } from 'modules/trekResult/connector';
import { PopupResult } from 'modules/trekResult/interface';
import { getTouristicContentPopupResult } from 'modules/touristicContent/connector';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';

export const usePopupResult = (
  id: string,
  shouldFetch: boolean,
  type: 'TREK' | 'TOURISTIC_CONTENT',
) => {
  const language = useRouter().locale ?? getDefaultLanguage();
  const { data: trekPopupResult, isLoading } = useQuery<PopupResult, Error>(
    ['popupResult', id],
    () =>
      type === 'TREK'
        ? getTrekPopupResult(id, language)
        : getTouristicContentPopupResult(id, language),
    { enabled: shouldFetch },
  );

  return {
    trekPopupResult,
    isLoading,
  };
};
