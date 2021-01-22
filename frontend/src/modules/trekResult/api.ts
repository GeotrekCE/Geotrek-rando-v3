import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawTrekPopupResult } from './interface';

const fieldsParams = {
  fields: 'name,departure,thumbnail',
};

export const fetchTrekPopupResult = (query: APIQuery, id: string): Promise<RawTrekPopupResult> =>
  GeotrekAPI.url(`/trek/${id}/`)
    .query({ ...query, ...fieldsParams })
    .get()
    .json();
