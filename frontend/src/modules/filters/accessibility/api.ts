import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawAccessibilty } from './interface';

export const fetchAccessibilities = (
  query: APIQuery,
): Promise<APIResponseForList<RawAccessibilty>> =>
  GeotrekAPI.get('/trek_accessibility/', { params: { ...query, ...portalsFilter } }).then(
    r => r.data,
  );
