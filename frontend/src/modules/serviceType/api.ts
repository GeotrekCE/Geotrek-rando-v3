import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { ServiceType } from './interface';

const fieldsParams = {
  fields: 'id,name,pictogram',
};

export const fetchServiceType = (query: APIQuery): Promise<APIResponseForList<ServiceType>> =>
  GeotrekAPI.get('/service_type', {
    params: { ...query, ...fieldsParams },
  }).then(r => r.data);
