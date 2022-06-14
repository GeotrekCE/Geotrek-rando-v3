import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTrekRatingScale } from './interface';

const fieldsParams = {
  fields: 'id,name,practice',
};

export const fetchTrekRatingScale = (
  query: APIQuery,
): Promise<APIResponseForList<RawTrekRatingScale>> =>
  GeotrekAPI.get(`/trek_ratingscale`, {
    params: { ...query, ...fieldsParams, ...portalsFilter },
  }).then(r => r.data);
