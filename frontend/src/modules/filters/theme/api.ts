import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTheme } from './interface';

export const fetchThemes = (query: APIQuery): Promise<APIResponseForList<RawTheme>> =>
  GeotrekAPI.url('/theme').query(query).get().json();
