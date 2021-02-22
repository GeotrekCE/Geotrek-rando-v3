import { useQuery } from 'react-query';

import { getTrekPopupResult } from 'modules/trekResult/connector';
import { PopupResult } from 'modules/trekResult/interface';
import { getTouristicContentPopupResult } from 'modules/touristicContent/connector';

export const usePopupResult = (
  id: string,
  shouldFetch: boolean,
  type: 'TREK' | 'TOURISTIC_CONTENT',
) => {
  const { data: trekPopupResult, isLoading } = useQuery<PopupResult, Error>(
    ['popupResult', id],
    () => (type === 'TREK' ? getTrekPopupResult(id) : getTouristicContentPopupResult(id)),
    { enabled: shouldFetch },
  );

  return {
    trekPopupResult,
    isLoading,
  };
};
