import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawFeedbackMagnitude } from './interface';

export const fetchFeedbackMagnitude = (
  query: APIQuery,
): Promise<APIResponseForList<RawFeedbackMagnitude>> => {
  return GeotrekAPI.url('/feedback_magnitude')
    .query({ ...query })
    .get()
    .json();
};
