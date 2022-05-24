import { RawTrekRating, TrekRating, TrekRatingChoices, TrekRatingMapping } from './interface';

export const adaptTrekRating = ({
  rawTrekRating,
}: {
  rawTrekRating: RawTrekRating[];
}): TrekRatingChoices =>
  rawTrekRating.reduce(
    (items, item) => ({
      ...items,
      [item.id]: item,
    }),
    {} as TrekRatingChoices,
  );

export const adaptTrekRatingHashMap = (rawTrekRating: RawTrekRating[]): TrekRatingMapping => {
  const result: Record<string, TrekRating[]> = {};

  rawTrekRating.forEach(currentTrekRating => {
    if (!result[currentTrekRating.scale]) result[currentTrekRating.scale] = [];
    result[currentTrekRating.scale].push(currentTrekRating);
  });

  return result;
};
