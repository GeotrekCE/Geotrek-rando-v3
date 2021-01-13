import { Choices } from 'modules/filters/interface';
import { RawTag } from './interface';

export const adaptTags = (rawTags: RawTag[]): Choices =>
  rawTags.reduce(
    (tags, currentTag) => ({
      ...tags,
      [`${currentTag.id}`]: { label: currentTag.name },
    }),
    {},
  );
