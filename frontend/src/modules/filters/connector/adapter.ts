import { Choices, Filter, RawDifficulty } from '../interface';

export const adaptDifficulties = (rawDifficulties: RawDifficulty[]): Choices =>
  rawDifficulties.reduce(
    (difficulties, currentRawDifficulty) => ({
      ...difficulties,
      [`${currentRawDifficulty.id}`]: { label: currentRawDifficulty.label },
    }),
    {},
  );

export const adaptDifficultyFilter = (rawDifficulties: RawDifficulty[]): Filter => ({
  id: 'difficulty',
  options: rawDifficulties.map(rawDifficulty => ({
    value: rawDifficulty.id,
    label: rawDifficulty.label,
  })),
});
