import { adaptLabels } from './adapter';
import { fetchLabels } from './api';
import { LabelDictionnary } from './interface';

export const getLabels = async (): Promise<LabelDictionnary> => {
  const rawLabels = await fetchLabels({ language: 'fr' });
  return adaptLabels(rawLabels.results);
};
