import { Difficulty } from './interface';
import { adaptDifficulties, adaptDifficulty, adaptDifficultyFilter } from './adapter';
import { fetchDifficulties, fetchDifficulty } from './api';
import { DifficultyChoices } from './interface';

export const getDifficulties = async (): Promise<DifficultyChoices> => {
  const rawDifficulties = await fetchDifficulties({ language: 'fr' });
  return adaptDifficulties(rawDifficulties.results);
};

export const getDifficulty = async (id: number | null): Promise<Difficulty | null> => {
  if (id === null) {
    return null;
  }
  const rawDifficulty = await fetchDifficulty({ language: 'fr' }, id);
  return adaptDifficulty(rawDifficulty);
};

export const getDifficultyFilter = async () => {
  const rawDifficulties = await fetchDifficulties({ language: 'fr' });
  return adaptDifficultyFilter(rawDifficulties.results);
};
