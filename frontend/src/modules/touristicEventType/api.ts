import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTouristicEventType } from './interface';

const fieldsParams = {
  fields: 'id,type,pictogram',
};

export const fetchTouristicEventTypes = (
  query: APIQuery,
): Promise<APIResponseForList<RawTouristicEventType>> =>
  GeotrekAPI.url(`/touristicevent_type`)
    .query({ ...query, ...fieldsParams, ...portalsFilter })
    .get()
    .json();
