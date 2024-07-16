import { SignageType, SignageTypeDictionary } from './interface';
export const adaptSignageType = (signageType: SignageType[]): SignageTypeDictionary => 
  Object.fromEntries(signageType.map(item => [item.id, item]));
