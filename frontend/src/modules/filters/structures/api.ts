import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawStructure } from './interface';

export const fetchStructures = (query: APIQuery): Promise<APIResponseForList<RawStructure>> =>
  GeotrekAPI.url('/structure').query(query).get().json();
