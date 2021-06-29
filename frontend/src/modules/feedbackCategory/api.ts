import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawFeedbackCategory } from './interface';

export const fetchFeedbackCategory = (
  query: APIQuery,
): Promise<APIResponseForList<RawFeedbackCategory>> => {
  return GeotrekAPI.url('/feedback_category')
    .query({ ...query })
    .get()
    .json();
};
