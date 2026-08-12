import { RawVigilanceAreaType, VigilanceAreaType } from './interface';

export const adaptVigilanceAreaType = ({
  rawVigilanceAreaType,
  language,
}: {
  rawVigilanceAreaType: RawVigilanceAreaType;
  language: string;
}): VigilanceAreaType => {
  const name =
    typeof rawVigilanceAreaType.name === 'string'
      ? rawVigilanceAreaType.name
      : rawVigilanceAreaType.name?.[language] || rawVigilanceAreaType.name?.fr || '';

  return {
    id: String(rawVigilanceAreaType.id),
    name,
    pictogramUrl: rawVigilanceAreaType.pictogram,
  };
};

export const adaptVigilanceAreaTypes = ({
  rawVigilanceAreaTypes,
  language,
}: {
  rawVigilanceAreaTypes: RawVigilanceAreaType[];
  language: string;
}): Record<string, VigilanceAreaType> => {
  return rawVigilanceAreaTypes.reduce(
    (acc, current) => ({
      ...acc,
      [current.id]: adaptVigilanceAreaType({ rawVigilanceAreaType: current, language }),
    }),
    {},
  );
};
