import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawOutdoorRatingScale } from './interface';

const fieldsParams = {
  fields: 'id,name,practice',
};

export const fetchOutdoorRatingScale = (
  query: APIQuery,
): Promise<APIResponseForList<RawOutdoorRatingScale>> =>
  GeotrekAPI.get(`/outdoor_ratingscale/`, {
    params: { ...query, ...fieldsParams, ...portalsFilter },
  }).then(r => r.data);
