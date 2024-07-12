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

  const func = () => {
    if (type === 'TREK') {
      return getTrekGeometryResult;
    }
    if (type === 'OUTDOOR_SITE') {
      return getOutdoorSiteGeometryResult;
    }
    if (type === 'TOURISTIC_EVENT') {
      return getTouristicEventGeometryResult;
    }
    return getTouristicContentGeometryResult;
  };

  const { data: trekGeometry } = useQuery<GeometryObject, Error>({
    queryKey: ['trekPopupResult', id, language],
    queryFn: () => func()(String(id), language),
  });

  return { trekGeometry };
};
