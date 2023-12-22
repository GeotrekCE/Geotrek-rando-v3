import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawOrganizer } from './interface';

export const fetchOrganizer = (query: APIQuery): Promise<APIResponseForList<RawOrganizer>> =>
  GeotrekAPI.get('/touristicevent_organizer/', { params: query }).then(r => r.data);
