import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawDifficulty } from '../interface';

export const fetchDifficulties = (
  query: APIQuery,
): Promise<APIResponseForList<Partial<RawDifficulty>>> =>
  GeotrekAPI.get('/trek_difficulty/', { params: { ...query, ...portalsFilter } }).then(r => r.data);

export const fetchDifficulty = (query: APIQuery, id: number): Promise<RawDifficulty> =>
  GeotrekAPI.get(`/trek_difficulty/${encodeURIComponent(id)}/`, { params: query }).then(
    r => r.data,
  );
