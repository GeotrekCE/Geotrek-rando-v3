import { SignageType, SignageTypeDictionary } from './interface';
export const adaptSignageType = (signageType: SignageType[]): SignageTypeDictionary => {
  return signageType.reduce(
    (list, item) => ({
      ...list,
      [item.id]: item,
    }),
    {},
  );
};
