import { FeedbackCategory, RawFeedbackCategory } from './interface';

export const adaptFeedbackCategory = (
  rawFeedbackCategory: RawFeedbackCategory[],
): FeedbackCategory[] =>
  rawFeedbackCategory.map(feedback => ({
    label: feedback.label,
    id: Number(feedback.id),
  }));
