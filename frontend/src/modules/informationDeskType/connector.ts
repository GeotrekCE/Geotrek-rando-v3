import { adaptInformationDeskTypes } from './adapter';
import { fetchInformationDeskTypes } from './api';
import { InformationDeskTypeDictionnary } from './interface';

export const getInformationDeskTypes = async (): Promise<InformationDeskTypeDictionnary> => {
  const rawInformationDeskTypes = await fetchInformationDeskTypes({ language: 'fr' });
  return adaptInformationDeskTypes(rawInformationDeskTypes.results);
};
