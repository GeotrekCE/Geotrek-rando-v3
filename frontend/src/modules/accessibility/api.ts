import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { AccessibilityLevel, RawAccessibility } from './interface';

export const fetchAccessibilities = (
  query: APIQuery,
): Promise<APIResponseForList<RawAccessibility>> =>
  GeotrekAPI.get('/trek_accessibility', { params: { ...query, ...portalsFilter } }).then(
    r => r.data,
  );

export const fetchAccessibilityLevel = (id: number): Promise<AccessibilityLevel> =>
  GeotrekAPI.get(`/trek_accessibility_level/${id}`).then(r => r.data);
