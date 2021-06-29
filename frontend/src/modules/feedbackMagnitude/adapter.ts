import { FeedbackMagnitude, RawFeedbackMagnitude } from './interface';

export const adaptFeedbackMagnitude = (
  rawFeedbackMagnitude: RawFeedbackMagnitude[],
): FeedbackMagnitude[] =>
  rawFeedbackMagnitude.map(feedback => ({
    label: feedback.label,
    id: Number(feedback.id),
  }));
