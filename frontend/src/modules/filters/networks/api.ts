import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawNetworks } from './interface';

export const fetchNetworks = (query: APIQuery): Promise<APIResponseForList<RawNetworks>> =>
  GeotrekAPI.get('/trek_network/', { params: query }).then(r => r.data);
