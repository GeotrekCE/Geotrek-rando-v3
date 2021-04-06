import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawDifficulty } from '../interface';

export const fetchDifficulties = (
  query: APIQuery,
): Promise<APIResponseForList<Partial<RawDifficulty>>> =>
  GeotrekAPI.url('/trek_difficulty')
    .query({ ...query, ...portalsFilter })
    .get()
    .json();

export const fetchDifficulty = (query: APIQuery, id: number): Promise<RawDifficulty> =>
  GeotrekAPI.url(`/trek_difficulty/${id}/`).query(query).get().json();
