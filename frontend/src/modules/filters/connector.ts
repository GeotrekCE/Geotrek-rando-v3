import { adaptDifficulties } from './adapter';
import { fetchDifficulties } from './api';
import { Choices } from './interface';

export const getDifficulties = async (): Promise<Choices> => {
  const rawDifficulties = await fetchDifficulties({ language: 'fr' });
  return adaptDifficulties(rawDifficulties.results);
};
