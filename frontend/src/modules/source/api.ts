import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawSource } from './interface';

export const fetchSources = (query: APIQuery): Promise<APIResponseForList<RawSource>> =>
  GeotrekAPI.url(`/source`).query(query).get().json();
