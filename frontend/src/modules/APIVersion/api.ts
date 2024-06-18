import { GeotrekAPI } from 'services/api/client';
import { APIVersion } from './interface';

export const fetchAPIVersion = (): Promise<APIVersion> =>
  GeotrekAPI.get('/version').then(r => r.data);
