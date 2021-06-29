import { adaptFeedbackMagnitude } from './adapter';
import { fetchFeedbackMagnitude } from './api';
import { FeedbackMagnitude } from './interface';

export const getFeedbackMagnitude = async (language: string): Promise<FeedbackMagnitude[]> => {
  const raw = await fetchFeedbackMagnitude({ language });
  return adaptFeedbackMagnitude(raw.results);
};
