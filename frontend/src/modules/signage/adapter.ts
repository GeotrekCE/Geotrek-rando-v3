import { SignageTypeDictionary } from 'modules/signageType/interface';
import { RawSignage, Signage, SignageDictionary } from './interface';

const adaptSignage = (
  rawSignage: RawSignage,
  signageTypeDictionary: SignageTypeDictionary,
): Signage => ({
  id: rawSignage.id,
  imageUrl: rawSignage.attachments?.find(({ type }) => type === 'image')?.thumbnail ?? null,
  description: rawSignage.description,
  geometry: rawSignage.geometry,
  name: rawSignage.name,
  type: signageTypeDictionary[rawSignage.type],
});

export const adaptSignages = ({
  rawSignages,
  signageTypeDictionary,
}: {
  rawSignages: RawSignage[];
  signageTypeDictionary: SignageTypeDictionary;
}): SignageDictionary | null => {
  if (rawSignages.length === 0) {
    return null;
  }
  return rawSignages.reduce(
    (Signages, currentSignage) => ({
      ...Signages,
      [currentSignage.id]: adaptSignage(currentSignage, signageTypeDictionary),
    }),
    {},
  );
};
