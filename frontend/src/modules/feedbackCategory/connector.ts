import { adaptFeedbackCategory } from './adapter';
import { fetchFeedbackCategory } from './api';
import { FeedbackCategory } from './interface';

export const getFeedbackCategory = async (language: string): Promise<FeedbackCategory[]> => {
  const raw = await fetchFeedbackCategory({ language });
  return adaptFeedbackCategory(raw.results);
};
