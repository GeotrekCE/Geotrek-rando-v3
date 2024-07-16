import { Choices } from 'modules/filters/interface';
import { RawTag } from './interface';

export const adaptTags = (rawTags: RawTag[]): Choices =>
  Object.fromEntries(rawTags.map(tag => [tag.id, { label: tag.name }]));
