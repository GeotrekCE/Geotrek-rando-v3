import { FilterWithoutType } from '../interface';
import { Difficulty } from './interface';
import { adaptDifficulties, adaptDifficulty, adaptDifficultyFilter } from './adapter';
import { fetchDifficulties, fetchDifficulty } from './api';
import { DifficultyChoices } from './interface';

export const getDifficulties = async (language: string): Promise<DifficultyChoices> => {
  const rawDifficulties = await fetchDifficulties({ language });
  return adaptDifficulties(rawDifficulties.results);
};

export const getDifficulty = async (
  id: number | null,
  language: string,
): Promise<Difficulty | null> => {
  if (id === null) {
    return null;
  }
  const rawDifficulty = await fetchDifficulty({ language }, id);
  return adaptDifficulty(rawDifficulty);
};

export const getDifficultyFilter = async (language: string): Promise<FilterWithoutType> => {
  const rawDifficulties = await fetchDifficulties({ language }); //TODO
  return adaptDifficultyFilter(rawDifficulties.results);
};
