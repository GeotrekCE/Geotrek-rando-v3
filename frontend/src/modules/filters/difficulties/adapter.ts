import { Difficulty } from './interface';
import { FilterWithoutType, RawDifficulty } from '../interface';
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
  Object.fromEntries(rawDifficulties.filter(isRawDifficultyComplete).map(({ id, label, pictogram:pictogramUri }) => [id, { id, label, pictogramUri }]))

export const adaptDifficultyFilter = (
  rawDifficulties: Partial<RawDifficulty>[],
): FilterWithoutType => ({
  id: 'difficulty',
  options: rawDifficulties.filter(isRawDifficultyComplete).map(rawDifficulty => ({
    value: `${rawDifficulty.id}`,
    label: rawDifficulty.label,
  })),
});
