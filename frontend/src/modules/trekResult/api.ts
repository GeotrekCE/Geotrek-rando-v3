import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawTrekGeometryResult, RawTrekPopupResult } from './interface';

const fieldsParams = {
  fields: 'name,departure,attachments',
};

export const fetchTrekPopupResult = (query: APIQuery, id: string): Promise<RawTrekPopupResult> =>
  GeotrekAPI.url(`/trek/${id}/`)
    .query({ ...query, ...fieldsParams })
    .get()
    .json();

export const fetchTrekGeometryResult = (
  query: APIQuery,
  id: string,
): Promise<RawTrekGeometryResult> =>
  GeotrekAPI.url(`/trek/${id}/`)
    .query({ ...query, fields: 'geometry' })
    .get()
    .json();
