import { useQuery } from '@tanstack/react-query';

import { getTrekGeometryResult } from 'modules/trekResult/connector';
import { GeometryObject } from 'modules/interface';
import { useRouter } from 'next/router';
import { getDefaultLanguage } from 'modules/header/utills';
import { getTouristicContentGeometryResult } from 'modules/touristicContent/connector';
import { getTouristicEventGeometryResult } from 'modules/touristicEvent/connector';
import { getOutdoorSiteGeometryResult } from 'modules/outdoorSite/connector';

export const useObjectGeometry = (
  id: number,
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'TOURISTIC_EVENT',
) => {
  const language = useRouter().locale ?? getDefaultLanguage();

  const getterByType = {
    TREK: getTrekGeometryResult,
    OUTDOOR_SITE: getOutdoorSiteGeometryResult,
    TOURISTIC_EVENT: getTouristicEventGeometryResult,
    TOURISTIC_CONTENT: getTouristicContentGeometryResult,
  };
  const getter = getterByType[type];

  const { data: trekGeometry } = useQuery<GeometryObject, Error>({
    queryKey: ['trekPopupResult', type, id, language],
    queryFn: () => getter?.(String(id), language),
  });

  return { trekGeometry };
};
