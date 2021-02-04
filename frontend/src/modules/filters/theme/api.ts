import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTheme } from './interface';

export const fetchThemes = (query: APIQuery): Promise<APIResponseForList<Partial<RawTheme>>> =>
  GeotrekAPI.url('/theme').query(query).get().json();

export const fetchTheme = (query: APIQuery, id: number): Promise<RawTheme> =>
  GeotrekAPI.url(`/theme/${id}`).query(query).get().json();
