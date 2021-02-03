import { adaptInformationDesks } from './adapter';
import { fetchInformationDesks } from './api';
import { InformationDeskDictionnary } from './interface';

export const getInformationDesks = async (): Promise<InformationDeskDictionnary> => {
  const rawInformationDesks = await fetchInformationDesks({ language: 'fr' });
  return adaptInformationDesks({
    rawInformationDesks: rawInformationDesks.results,
  });
};
