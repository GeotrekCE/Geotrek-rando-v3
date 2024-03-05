import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawMenuItem } from './interface';

export const fetchMenuItems = (query: APIQuery): Promise<RawMenuItem[]> =>
  GeotrekAPI.get(`/menu_item/`, {
    params: { ...query, ...portalsFilter },
  }).then(r => r.data);
