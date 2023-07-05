import { getCities } from 'modules/city/connector';
import { getThemes } from 'modules/filters/theme/connector';
import { getInformationDesks } from 'modules/informationDesk/connector';
import { getLabels } from 'modules/label/connector';
import { getSources } from 'modules/source/connector';
import { CommonDictionaries } from './interface';

export const getCommonDictionaries = async (language: string): Promise<CommonDictionaries> => {
  let dictionaries;
  try {
    const [themes, cities, sources, informationDesk, labels] = await Promise.all([
      getThemes(language),
      getCities(language),
      getSources(language),
      getInformationDesks(language),
      getLabels(language),
    ]);
    dictionaries = {
      themes,
      cities,
      sources,
      informationDesk,
      labels,
    };
  } catch (e) {
    console.error('Error in dictionaries/connector', e);
    throw e;
  }
  return dictionaries;
};
