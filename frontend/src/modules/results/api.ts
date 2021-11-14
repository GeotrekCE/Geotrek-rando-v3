import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTrekResult } from './interface';

const fieldsParams = {
  fields:
    'id,departure,name,themes,duration,length_2d,ascent,difficulty,reservation_system,attachments,practice,departure_city',
};

export const fetchTrekResults = (
  query: APIQuery,
): Promise<APIResponseForList<Partial<RawTrekResult>>> =>
  GeotrekAPI.url('/trek')
    .query({ ...query, ...fieldsParams, ...portalsFilter })
    .get()
    .json();

export const fetchTrekResult = (query: APIQuery, id: number): Promise<RawTrekResult> =>
  GeotrekAPI.url(`/trek/${id}`)
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

export const fetchTrekResultsNumber = (
  query: APIQuery,
): Promise<APIResponseForList<{ id: number }>> =>
  GeotrekAPI.url('/trek')
    .query({ ...query, fields: 'id', ...portalsFilter })
    .get()
    .json();

export const fetchTouristicContentResultsNumber = (
  query: APIQuery,
): Promise<APIResponseForList<{ id: number }>> =>
  GeotrekAPI.url('/touristiccontent')
    .query({ ...query, fields: 'id', ...portalsFilter })
    .get()
    .json();

export const fetchOutdoorSitesResultsNumber = (
  query: APIQuery,
): Promise<APIResponseForList<{ id: number }>> =>
  GeotrekAPI.url('/outdoor_site')
    .query({ ...query, fields: 'id', ...portalsFilter })
    .get()
    .json();

export const fetchTouristicEventsResultsNumber = (
  query: APIQuery,
): Promise<APIResponseForList<{ id: number }>> =>
  GeotrekAPI.url('/touristicevent')
    .query({ ...query, fields: 'id', ...portalsFilter })
    .get()
    .json();
