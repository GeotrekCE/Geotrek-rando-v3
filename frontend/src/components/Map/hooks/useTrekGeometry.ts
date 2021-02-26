import { useQuery } from 'react-query';

import { getTrekGeometryResult } from 'modules/trekResult/connector';
import { TrekGeometryResult } from 'modules/trekResult/interface';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';

export const useTrekGeometry = (id?: number) => {
  const language = useRouter().locale ?? getDefaultLanguage();
  const { data: trekGeometry } = useQuery<TrekGeometryResult, Error>(
    ['trekPopupResult', id, language],
    () =>
      id === undefined ? new Promise(() => []) : getTrekGeometryResult(id.toString(), language),
    { enabled: id !== undefined },
  );

  return { trekGeometry };
};
