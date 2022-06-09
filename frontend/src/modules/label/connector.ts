import { adaptLabels, adaptLabelsFilter } from './adapter';
import { fetchLabels } from './api';
import { LabelDictionnary } from './interface';

export const getLabels = async (language: string): Promise<LabelDictionnary> => {
  const rawLabels = await fetchLabels({ language });
  return adaptLabels(rawLabels.results);
};

export const getLabelsFilter = async (language: string, withExclude = false) => {
  const rawLabels = await fetchLabels({ language });
  return adaptLabelsFilter(rawLabels.results, withExclude);
};
