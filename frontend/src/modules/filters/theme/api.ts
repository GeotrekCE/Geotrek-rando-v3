import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawThemes } from './interface';

export const fetchThems = (query: APIQuery): Promise<APIResponseForList<RawThemes>> =>
  GeotrekAPI.url('/theme').query(query).get().json();
