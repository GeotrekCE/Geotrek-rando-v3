import { Choices } from 'modules/filters/interface';
import { adaptTags } from './adapter';
import { fetchTags } from './api';

export const getTags = async (language: string): Promise<Choices> => {
  const rawTags = await fetchTags({ language });
  return adaptTags(rawTags.results);
};
