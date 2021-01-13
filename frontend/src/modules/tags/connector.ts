import { Choices } from 'modules/filters/interface';
import { adaptTags } from './adapter';
import { fetchTags } from './api';

export const getTags = async (): Promise<Choices> => {
  const rawTags = await fetchTags({ language: 'fr' });
  return adaptTags(rawTags.results);
};
