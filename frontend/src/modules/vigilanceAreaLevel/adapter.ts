import { RawVigilanceAreaLevel, VigilanceAreaLevel } from './interface';

export const adaptVigilanceAreaLevel = ({
  rawVigilanceAreaLevel,
  language,
}: {
  rawVigilanceAreaLevel: RawVigilanceAreaLevel;
  language: string;
}): VigilanceAreaLevel => {
  const name =
    typeof rawVigilanceAreaLevel.name === 'string'
      ? rawVigilanceAreaLevel.name
      : rawVigilanceAreaLevel.name?.[language] || rawVigilanceAreaLevel.name?.fr || '';

  return {
    id: String(rawVigilanceAreaLevel.id),
    name,
    color: rawVigilanceAreaLevel.color ?? null,
    level: rawVigilanceAreaLevel.level ?? null,
    pictogramUrl: rawVigilanceAreaLevel.pictogram ?? null,
  };
};

export const adaptVigilanceAreaLevels = ({
  rawVigilanceAreaLevels,
  language,
}: {
  rawVigilanceAreaLevels: RawVigilanceAreaLevel[];
  language: string;
}): Record<string, VigilanceAreaLevel> => {
  return rawVigilanceAreaLevels.reduce(
    (acc, current) => ({
      ...acc,
      [current.id]: adaptVigilanceAreaLevel({ rawVigilanceAreaLevel: current, language }),
    }),
    {},
  );
};
