import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawPoiType } from './interface';

export const fetchPoiTypes = (query: APIQuery): Promise<APIResponseForList<RawPoiType>> =>
  GeotrekAPI.url(`/poitype`).query(query).get().json();
