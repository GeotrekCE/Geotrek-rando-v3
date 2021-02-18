import { adaptLabels } from './adapter';
import { fetchLabels } from './api';
import { LabelDictionnary } from './interface';

export const getLabels = async (language: string): Promise<LabelDictionnary> => {
  const rawLabels = await fetchLabels({ language });
  return adaptLabels(rawLabels.results);
};
