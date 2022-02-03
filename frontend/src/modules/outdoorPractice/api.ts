import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawOutdoorPractice } from './interface';

const fieldsParams = {
  fields: 'id,name,sector,pictogram',
};

export const fetchOutdoorPractices = (
  query: APIQuery,
): Promise<APIResponseForList<RawOutdoorPractice>> =>
  GeotrekAPI.get(`/outdoor_practice`, { params: { ...query, ...fieldsParams, ...portalsFilter } });
