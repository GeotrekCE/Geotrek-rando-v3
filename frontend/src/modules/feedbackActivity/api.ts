import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawFeedbackActivity } from './interface';

export const fetchFeedbackActivity = (
  query: APIQuery,
): Promise<APIResponseForList<RawFeedbackActivity>> => {
  return GeotrekAPI.get('/feedback_activity/', { params: { ...query } }).then(r => r.data);
};
