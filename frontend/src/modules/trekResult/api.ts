import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawTrekGeometryResult, RawTrekPopupResult } from './interface';

const fieldsParams = {
  fields: 'name,departure,attachments',
};

export const fetchTrekPopupResult = (query: APIQuery, id: string): Promise<RawTrekPopupResult> =>
  GeotrekAPI.get(`/trek/${id}/`, { params: { ...query, ...fieldsParams } }).then(r => r.data);

export const fetchTrekGeometryResult = (
  query: APIQuery,
  id: string,
): Promise<RawTrekGeometryResult> =>
  GeotrekAPI.get(`/trek/${id}/`, { params: { ...query, fields: 'geometry' } }).then(r => r.data);
