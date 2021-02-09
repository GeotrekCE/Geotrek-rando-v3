import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTouristicContent } from './interface';

const fieldsParams = {
  fields: 'attachments,name,category,description_teaser,geometry',
};

export const fetchTouristicContent = (
  query: APIQuery,
): Promise<APIResponseForList<RawTouristicContent>> =>
  GeotrekAPI.url(`/touristiccontent`)
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

const fieldsParamsResult = {
  fields: 'attachments,name,category,description_teaser',
};

export const fetchTouristicContentResult = (
  query: APIQuery,
): Promise<APIResponseForList<RawTouristicContent>> =>
  GeotrekAPI.url(`/touristiccontent`)
    .query({ ...query, ...fieldsParamsResult })
    .get()
    .json();
