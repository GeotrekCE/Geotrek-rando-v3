import { useQuery } from 'react-query';

import { getTrekGeometryResult } from 'modules/trekResult/connector';
import { GeometryObject } from 'modules/interface';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { getTouristicContentGeometryResult } from 'modules/touristicContent/connector';

export const useObjectGeometry = (
  id: number,
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT',
) => {
  const language = useRouter().locale ?? getDefaultLanguage();

  const func = type === 'TREK' ? getTrekGeometryResult : getTouristicContentGeometryResult;

  const { data: trekGeometry } = useQuery<GeometryObject, Error>(
    ['trekPopupResult', id, language],
    () => func(String(id), language),
  );

  return { trekGeometry };
};
