import { SignageTypeDictionary } from 'modules/signageType/interface';
import { getThumbnail } from 'modules/utils/adapter';
import { RawSignage, Signage, SignageDictionary } from './interface';

const adaptSignage = (
  rawSignage: RawSignage,
  signageTypeDictionary: SignageTypeDictionary,
): Signage => ({
  id: rawSignage.id,
  imageUrl: getThumbnail(rawSignage.attachments),
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
  return Object.fromEntries(rawSignages.map(signage => [signage.id, adaptSignage(signage, signageTypeDictionary)]));
};
