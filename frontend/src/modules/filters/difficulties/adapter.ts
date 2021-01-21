import { Difficulty } from './interface';
import { Filter, RawDifficulty } from '../interface';
import { DifficultyChoices } from './interface';

export const adaptDifficulty = (rawDifficulty: RawDifficulty): Difficulty => ({
  label: rawDifficulty.label,
  pictogramUri: rawDifficulty.pictogram,
});

export const adaptDifficulties = (rawDifficulties: RawDifficulty[]): DifficultyChoices =>
  rawDifficulties.reduce<DifficultyChoices>(
    (difficulties, currentRawDifficulty) => ({
      ...difficulties,
      [`${currentRawDifficulty.id}`]: adaptDifficulty(currentRawDifficulty),
    }),
    {},
  );

export const adaptDifficultyFilter = (rawDifficulties: RawDifficulty[]): Filter => ({
  id: 'difficulty',
  options: rawDifficulties.map(rawDifficulty => ({
    value: `${rawDifficulty.id}`,
    label: rawDifficulty.label,
  })),
});
