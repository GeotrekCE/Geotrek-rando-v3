import { RawTrekRatingScale, TrekRatingScale } from './interface';

export const adaptTrekRatingScale = ({
  rawTrekRatingScale,
}: {
  rawTrekRatingScale: RawTrekRatingScale[];
}): TrekRatingScale[] => rawTrekRatingScale.map(item => item);
