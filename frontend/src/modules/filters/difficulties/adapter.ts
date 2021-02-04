import { Difficulty } from './interface';
import { Filter, RawDifficulty } from '../interface';
import { DifficultyChoices } from './interface';

const isRawDifficultyComplete = (
  rawDifficulty: Partial<RawDifficulty>,
): rawDifficulty is RawDifficulty =>
  rawDifficulty.id !== undefined &&
  rawDifficulty.label !== undefined &&
  rawDifficulty.pictogram !== undefined &&
  rawDifficulty.cirkwi_level !== undefined;

export const adaptDifficulty = (rawDifficulty: RawDifficulty): Difficulty => ({
  label: rawDifficulty.label,
  pictogramUri: rawDifficulty.pictogram,
});

export const adaptDifficulties = (rawDifficulties: Partial<RawDifficulty>[]): DifficultyChoices =>
  rawDifficulties.filter(isRawDifficultyComplete).reduce<DifficultyChoices>(
    (difficulties, currentRawDifficulty) => ({
      ...difficulties,
      [`${currentRawDifficulty.id}`]: adaptDifficulty(currentRawDifficulty),
    }),
    {},
  );

export const adaptDifficultyFilter = (rawDifficulties: Partial<RawDifficulty>[]): Filter => ({
  id: 'difficulty',
  options: rawDifficulties.filter(isRawDifficultyComplete).map(rawDifficulty => ({
    value: `${rawDifficulty.id}`,
    label: rawDifficulty.label,
  })),
});
