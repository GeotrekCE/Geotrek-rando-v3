import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawPoiType } from './interface';

export const fetchPoiTypes = (query: APIQuery): Promise<APIResponseForList<RawPoiType>> =>
  GeotrekAPI.get(`/poi_type`, { params: query }).then(r => r.data);
