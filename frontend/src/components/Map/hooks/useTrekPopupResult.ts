import { useQuery } from 'react-query';

import { getTrekPopupResult } from 'modules/trekResult/connector';
import { TrekPopupResult } from 'modules/trekResult/interface';

export const useTrekPopupResult = (id: string) => {
  const { data: trekPopupResult, isLoading } = useQuery<TrekPopupResult, Error>(
    ['trekPopupResult', id],
    () => getTrekPopupResult(id),
  );

  return {
    trekPopupResult,
    isLoading,
  };
};
