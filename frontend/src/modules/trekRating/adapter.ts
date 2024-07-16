import { RawTrekRating, TrekRating, TrekRatingChoices, TrekRatingMapping } from './interface';

export const adaptTrekRating = ({
  rawTrekRating,
}: {
  rawTrekRating: RawTrekRating[];
}): TrekRatingChoices =>
  Object.fromEntries(rawTrekRating.map(item => [item.id, item]))

export const adaptTrekRatingHashMap = (rawTrekRating: RawTrekRating[]): TrekRatingMapping => {
  const result: Record<string, TrekRating[]> = {};

  rawTrekRating.forEach(currentTrekRating => {
    result[currentTrekRating.scale].push(currentTrekRating);
  });

  return result;
};
