import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { InfrastructureType } from './interface';

const fieldsParams = {
  fields: 'id,label,pictogram',
};

export const fetchInfrastructureType = (
  query: APIQuery,
): Promise<APIResponseForList<InfrastructureType>> =>
  GeotrekAPI.get('/infrastructure_type', {
    params: { ...query, ...fieldsParams },
  }).then(r => r.data);
