import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawOutdoorSiteType } from './interface';

const fieldsParams = {
  fields: 'id,name,practice',
};

export const fetchOutdoorSiteType = (
  query: APIQuery,
): Promise<APIResponseForList<RawOutdoorSiteType>> =>
  GeotrekAPI.get(`/outdoor_sitetype`, {
    params: { ...query, ...fieldsParams, ...portalsFilter },
  }).then(r => r.data);
