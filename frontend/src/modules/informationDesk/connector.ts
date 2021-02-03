import { adaptInformationDesks } from './adapter';
import { fetchInformationDesks } from './api';
import { InformationDeskDictionnary } from './interface';

export const getInformationDesks = async (): Promise<InformationDeskDictionnary> => {
  try {
    const rawInformationDesks = await fetchInformationDesks({ language: 'fr' });
    return adaptInformationDesks({
      rawInformationDesks: rawInformationDesks.results,
    });
  } catch (e) {
    console.error('Error in informationDesk/connector', e);
    throw e;
  }
};
