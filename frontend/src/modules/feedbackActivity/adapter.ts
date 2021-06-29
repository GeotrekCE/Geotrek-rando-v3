import { FeedbackActivity, RawFeedbackActivity } from './interface';

export const adaptFeedbackActivity = (
  rawFeedbackActivity: RawFeedbackActivity[],
): FeedbackActivity[] =>
  rawFeedbackActivity.map(feedback => ({
    label: feedback.label,
    id: Number(feedback.id),
  }));
