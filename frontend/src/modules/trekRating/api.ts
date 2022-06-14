import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTrekRating } from './interface';

const fieldsParams = {
  fields: 'id,name,description,order,color,scale',
};

export const fetchTrekRating = (query: APIQuery): Promise<APIResponseForList<RawTrekRating>> =>
  GeotrekAPI.get(`/trek_rating`, {
    params: { ...query, ...fieldsParams, ...portalsFilter },
  }).then(r => r.data);
