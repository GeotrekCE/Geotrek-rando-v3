import { Filter, RawDifficulty } from '../interface';
import { DifficultyChoices } from './interface';

export const adaptDifficulties = (rawDifficulties: RawDifficulty[]): DifficultyChoices =>
  rawDifficulties.reduce<DifficultyChoices>(
    (difficulties, currentRawDifficulty) => ({
      ...difficulties,
      [`${currentRawDifficulty.id}`]: {
        label: currentRawDifficulty.label,
        pictogramUri: currentRawDifficulty.pictogram,
      },
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
