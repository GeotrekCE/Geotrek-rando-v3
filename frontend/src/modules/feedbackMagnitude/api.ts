import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawFeedbackMagnitude } from './interface';

export const fetchFeedbackMagnitude = (
  query: APIQuery,
): Promise<APIResponseForList<RawFeedbackMagnitude>> => {
  return GeotrekAPI.get('/feedback_magnitude', { params: { ...query } }).then(r => r.data);
};
