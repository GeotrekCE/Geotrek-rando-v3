import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTrekResult } from './interface';

const fieldsParams = {
  fields:
    'id,departure,name,themes,duration,length_2d,ascent,descent,difficulty,reservation_system,attachments,practice,departure_city,route,networks',
};

export const fetchTrekResults = (
  query: APIQuery,
): Promise<APIResponseForList<Partial<RawTrekResult>>> =>
  GeotrekAPI.get('/trek/', { params: { ...query, ...fieldsParams, ...portalsFilter } }).then(
    r => r.data,
  );

export const fetchTrekResult = (query: APIQuery, id: number | string): Promise<RawTrekResult> =>
  GeotrekAPI.get(`/trek/${encodeURIComponent(id)}/`, {
    params: { ...query, ...fieldsParams },
  }).then(r => r.data);

export const fetchTrekResultsNumber = (
  query: APIQuery,
): Promise<APIResponseForList<{ id: number }>> =>
  GeotrekAPI.get('/trek/', { params: { fields: 'id', ...portalsFilter, ...query } }).then(
    r => r.data,
  );

export const fetchTouristicContentResultsNumber = (
  query: APIQuery,
): Promise<APIResponseForList<{ id: number }>> =>
  GeotrekAPI.get('/touristiccontent/', {
    params: { ...query, fields: 'id', ...portalsFilter },
  }).then(r => r.data);

export const fetchOutdoorSitesResultsNumber = (
  query: APIQuery,
): Promise<APIResponseForList<{ id: number }>> =>
  GeotrekAPI.get('/outdoor_site/', { params: { ...query, fields: 'id', ...portalsFilter } }).then(
    r => r.data,
  );

export const fetchTouristicEventsResultsNumber = (
  query: APIQuery,
): Promise<APIResponseForList<{ id: number }>> =>
  GeotrekAPI.get('/touristicevent/', { params: { ...query, fields: 'id', ...portalsFilter } }).then(
    r => r.data,
  );
