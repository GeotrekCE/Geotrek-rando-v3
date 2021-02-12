import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import {
  RawTouristicContent,
  RawTouristicContentDetails,
  RawTouristicContentResult,
} from './interface';

const fieldsParams = {
  fields: 'id,attachments,name,category,description_teaser,geometry',
};

export const fetchTouristicContent = (
  query: APIQuery,
): Promise<APIResponseForList<RawTouristicContent>> =>
  GeotrekAPI.url(`/touristiccontent`)
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

const fieldsParamsDetails = {
  fields: `${fieldsParams.fields},description,source,contact,email,website,cities,themes,types,pdf,approved`,
};

export const fetchTouristicContentDetails = (
  query: APIQuery,
  id: string,
): Promise<RawTouristicContentDetails> =>
  GeotrekAPI.url(`/touristiccontent/${id}/`)
    .query({ ...query, ...fieldsParamsDetails })
    .get()
    .json();

const fieldsParamsResult = {
  fields: 'id,attachments,name,category,description_teaser,themes,types,cities',
};

export const fetchTouristicContentResult = (
  query: APIQuery,
): Promise<APIResponseForList<RawTouristicContentResult>> =>
  GeotrekAPI.url(`/touristiccontent`)
    .query({ ...query, ...fieldsParamsResult })
    .get()
    .json();
