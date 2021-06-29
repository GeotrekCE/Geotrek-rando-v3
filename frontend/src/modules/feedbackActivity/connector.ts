import { adaptFeedbackActivity } from './adapter';
import { fetchFeedbackActivity } from './api';
import { FeedbackActivity } from './interface';

export const getFeedbackActivity = async (language: string): Promise<FeedbackActivity[]> => {
  const raw = await fetchFeedbackActivity({ language });
  return adaptFeedbackActivity(raw.results);
};
