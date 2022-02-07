import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTheme } from './interface';

export const fetchThemes = (query: APIQuery): Promise<APIResponseForList<Partial<RawTheme>>> =>
  GeotrekAPI.get('/theme', { params: { ...query, ...portalsFilter } }).then(r => r.data);

export const fetchTheme = (query: APIQuery, id: number): Promise<RawTheme> =>
  GeotrekAPI.get(`/theme/${id}`, { params: query }).then(r => r.data);
