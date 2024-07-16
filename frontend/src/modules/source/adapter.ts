import { RawSource, Source, SourceDictionnary } from './interface';

const adaptSource = (rawSource: RawSource): Source => ({
  name: rawSource.name,
  website: rawSource.website,
  pictogramUri: rawSource.pictogram,
});

export const adaptSources = (rawSources: RawSource[]): SourceDictionnary =>
  Object.fromEntries(rawSources.map(source => [source.id, adaptSource(source)]));
