import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawDifficulty } from './interface';

export const fetchDifficulties = (query: APIQuery): Promise<APIResponseForList<RawDifficulty>> =>
  GeotrekAPI.url('/difficulty').query(query).get().json();
