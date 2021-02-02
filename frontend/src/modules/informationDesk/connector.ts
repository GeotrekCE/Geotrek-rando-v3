import { fetchInformationDeskTypes } from 'modules/informationDeskType/api';
import { getInformationDeskTypes } from 'modules/informationDeskType/connector';
import { adaptInformationDesks } from './adapter';
import { InformationDeskDictionnary } from './interface';

export const getInformationDesks = async (): Promise<InformationDeskDictionnary> => {
  const [rawInformationDesks, informationDeskTypes] = await Promise.all([
    fetchInformationDeskTypes({ language: 'fr' }),
    getInformationDeskTypes(),
  ]);
  return adaptInformationDesks({
    rawInformationDesksResults: rawInformationDesks.results,
    informationDeskTypes,
  });
};
