import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawAccessibility } from './interface';

export const fetchAccessibilities = (
  query: APIQuery,
): Promise<APIResponseForList<RawAccessibility>> =>
  GeotrekAPI.get('/trek_accessibility', { params: { ...query, ...portalsFilter } }).then(
    r => r.data,
  );
