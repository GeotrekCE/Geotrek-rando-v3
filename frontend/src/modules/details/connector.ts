import { getAccessibilities } from 'modules/accessibility/connector';
import { getActivity } from 'modules/activities/connector';
import { getCities } from 'modules/city/connector';
import { getCourseType } from 'modules/filters/courseType/connector';
import { getDifficulty } from 'modules/filters/difficulties/connector';
import { getThemes } from 'modules/filters/theme/connector';
import { getInformationDesks } from 'modules/informationDesk/connector';
import { getLabels } from 'modules/label/connector';
import { getNetworks } from 'modules/networks/connector';
import { getPois } from 'modules/poi/connector';
import { getTrekResultsById } from 'modules/results/connector';
import { getSources } from 'modules/source/connector';
import { getTouristicContents } from 'modules/touristicContent/connector';
import { adaptChildren, adaptResults } from './adapter';
import { fetchDetails, fetchTrekChildren, fetchTrekName } from './api';
import { Details, TrekChild } from './interface';

export const getDetails = async (id: string): Promise<Details> => {
  try {
    const rawDetails = await fetchDetails({ language: 'fr' }, id);
    // Typescript limit for Promise.all is for 10 promises
    const [
      activity,
      difficulty,
      courseType,
      networks,
      themes,
      pois,
      touristicContents,
      cityDictionnary,
      accessibilityDictionnary,
      sourceDictionnary,
    ] = await Promise.all([
      getActivity(rawDetails.properties.practice),
      getDifficulty(rawDetails.properties.difficulty),
      getCourseType(rawDetails.properties.route),
      getNetworks(),
      getThemes(),
      getPois(rawDetails.properties.id),
      getTouristicContents(rawDetails.properties.id),
      getCities(),
      getAccessibilities(),
      getSources(),
    ]);
    const [informationDeskDictionnary, labelsDictionnary, children] = await Promise.all([
      getInformationDesks(),
      getLabels(),
      getTrekResultsById(rawDetails.properties.children),
    ]);
    return adaptResults({
      rawDetails,
      activity,
      difficulty,
      courseType,
      networks,
      themes,
      pois,
      touristicContents,
      cityDictionnary,
      accessibilityDictionnary,
      sourceDictionnary,
      informationDeskDictionnary,
      labelsDictionnary,
      children,
    });
  } catch (e) {
    console.error('Error in details/connector', e);
    throw e;
  }
};

export const getTrekChildren = async (parentId: string): Promise<TrekChild[]> => {
  try {
    const childrenIdsResult = await fetchTrekChildren({ language: 'fr' }, parentId);
    const childrenNames = await Promise.all(
      childrenIdsResult.children.map(childId => getName(childId)),
    );
    return adaptChildren({ childrenIds: childrenIdsResult.children, childrenNames });
  } catch (e) {
    console.error('Error in details/connector', e);
    throw e;
  }
};

export const getName = async (id: string): Promise<string> => {
  try {
    const result = await fetchTrekName({ language: 'fr' }, id);
    return result.name;
  } catch (e) {
    console.error('Error in details/connector', e);
    throw e;
  }
};
