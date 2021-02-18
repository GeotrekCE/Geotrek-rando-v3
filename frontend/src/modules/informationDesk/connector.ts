import { adaptInformationDesks } from './adapter';
import { fetchInformationDesks } from './api';
import { InformationDeskDictionnary } from './interface';

export const getInformationDesks = async (
  language: string,
): Promise<InformationDeskDictionnary> => {
  try {
    const rawInformationDesks = await fetchInformationDesks({ language });
    return adaptInformationDesks({
      rawInformationDesks: rawInformationDesks.results,
    });
  } catch (e) {
    console.error('Error in informationDesk/connector', e);
    throw e;
  }
};
