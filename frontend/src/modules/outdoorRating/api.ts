import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawOutdoorRating } from './interface';

const fieldsParams = {
  fields: 'id,name,description,order,color,squale',
};

export const fetchOutdoorRating = (
  query: APIQuery,
): Promise<APIResponseForList<RawOutdoorRating>> =>
  GeotrekAPI.url(`/outdoor_rating`)
    .query({ ...query, ...fieldsParams, ...portalsFilter })
    .get()
    .json();
