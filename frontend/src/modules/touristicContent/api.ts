import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTrekGeometryResult } from '../trekResult/interface';
import {
  RawTouristicContent,
  RawTouristicContentDetails,
  RawTouristicContentPopupResult,
  RawTouristicContentResult,
} from './interface';

const fieldsParams = {
  fields: 'id,attachments,name,category,description_teaser,geometry',
};

export const fetchTouristicContent = (
  query: APIQuery,
): Promise<APIResponseForList<RawTouristicContent>> =>
  GeotrekAPI.get(`/touristiccontent`, {
    params: { ...query, ...fieldsParams, ...portalsFilter },
  }).then(r => r.data);

const fieldsParamsDetails = {
  fields: `${fieldsParams.fields},description,source,contact,email,website,cities,themes,types,pdf,approved,accessibility,practical_info`,
  format: 'geojson',
};

export const fetchTouristicContentDetails = (
  query: APIQuery,
  id: string,
): Promise<RawTouristicContentDetails> =>
  GeotrekAPI.get(`/touristiccontent/${id}/`, {
    params: { ...fieldsParamsDetails, ...query, ...portalsFilter },
  }).then(r => r.data);

const fieldsParamsResult = {
  fields: 'id,attachments,name,category,description_teaser,themes,types,cities',
};

export const fetchTouristicContentResult = (
  query: APIQuery,
): Promise<APIResponseForList<RawTouristicContentResult>> =>
  GeotrekAPI.get(`/touristiccontent`, {
    params: { ...query, ...fieldsParamsResult, ...portalsFilter },
  }).then(r => r.data);

const fieldsParamsPopupResult = {
  fields: 'id,name,cities,attachments',
};

export const fetchTouristicContentPopupResult = (
  query: APIQuery,
  id: string,
): Promise<RawTouristicContentPopupResult> =>
  GeotrekAPI.get(`/touristiccontent/${id}/`, {
    params: { ...query, ...fieldsParamsPopupResult },
  }).then(r => r.data);

export const fetchTouristicContentGeometryResult = (
  query: APIQuery,
  id: string,
): Promise<RawTrekGeometryResult> =>
  GeotrekAPI.get(`/touristiccontent/${id}/`, { params: { ...query, fields: 'geometry' } }).then(
    r => r.data,
  );
