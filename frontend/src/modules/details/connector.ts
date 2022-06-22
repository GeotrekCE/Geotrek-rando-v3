import { fetchAccessibilityLevel } from 'modules/accessibility/api';
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
import { getSensitiveAreas } from 'modules/sensitiveArea/connector';
import { getSignage } from 'modules/signage/connector';
import { getService } from 'modules/service/connector';
import { getInfrastructure } from 'modules/infrastructure/connector';
import { getSources } from 'modules/source/connector';
import { getGlobalConfig } from 'modules/utils/api.config';
import { getTouristicContentsNearTarget } from 'modules/touristicContent/connector';
import { getTrekRating } from '../trekRating/connector';
import { getTrekRatingScale } from '../trekRatingScale/connector';
import { adaptChildren, adaptResults, adaptTrekChildGeometry } from './adapter';
import { fetchDetails, fetchTrekChildren, fetchTrekGeometry, fetchTrekName } from './api';
import { Details, TrekChildGeometry, TrekFamily } from './interface';

export const getDetails = async (id: string, language: string): Promise<Details> => {
  try {
    const rawDetails = await fetchDetails({ language }, id);
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
      getActivity(rawDetails.properties.practice, language),
      getDifficulty(rawDetails.properties.difficulty, language),
      getCourseType(rawDetails.properties.route, language),
      getNetworks(language),
      getThemes(language),
      getPois(rawDetails.properties.id, language),
      getTouristicContentsNearTarget(rawDetails.properties.id, language),
      getCities(language),
      getAccessibilities(language),
      getSources(language),
    ]);
    const [trekRating, trekRatingScale] = await Promise.all([
      getTrekRating(language),
      getTrekRatingScale(language),
    ]);
    const [
      informationDeskDictionnary,
      signage,
      service,
      infrastructure,
      labelsDictionnary,
      children,
      sensitiveAreas,
    ] = await Promise.all([
      getInformationDesks(language),
      getSignage(language, id, 'TREK'),
      getService(language, id, 'TREK'),
      getInfrastructure(language, id, 'TREK'),
      getLabels(language),
      getTrekResultsById(rawDetails.properties.children, language),
      getGlobalConfig().enableSensitiveAreas
        ? getSensitiveAreas('trek', rawDetails.properties.id, language)
        : [],
    ]);
    const childrenGeometry = await Promise.all(
      rawDetails.properties.children.map(childId => getChildGeometry(`${childId}`, language)),
    );

    const accessbilityLevel = rawDetails.properties.accessibility_level
      ? await fetchAccessibilityLevel(rawDetails.properties.accessibility_level)
      : null;

    return adaptResults({
      accessbilityLevel,
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
      childrenGeometry,
      sensitiveAreas,
      trekRating,
      trekRatingScale,
      signage,
      service,
      infrastructure,
      reservation:
        getGlobalConfig().reservationPartner && getGlobalConfig().reservationProject
          ? {
              partner: getGlobalConfig().reservationPartner,
              project: getGlobalConfig().reservationProject,
            }
          : null,
    });
  } catch (e) {
    console.error('Error in details/connector principal', e);
    throw e;
  }
};

export const getTrekFamily = async (
  parentId: string,
  language: string,
): Promise<TrekFamily | null> => {
  if (parentId.length === 0) return null;
  try {
    const [childrenIdsResult, parentName] = await Promise.all([
      fetchTrekChildren({ language }, parentId),
      getName(parentId, language),
    ]);
    const childrenNames = await Promise.all(
      childrenIdsResult.children.map(childId => getName(childId, language)),
    );
    return adaptChildren({
      childrenIds: childrenIdsResult.children,
      childrenNames,
      parentName,
      parentId,
    });
  } catch (e) {
    console.error('Error in details/connector', e);
    throw e;
  }
};

export const getName = async (id: string, language: string): Promise<string> => {
  try {
    const result = await fetchTrekName({ language }, id);
    return result.name;
  } catch (e) {
    console.error('Error in details/connector', e);
    throw e;
  }
};

const getChildGeometry = async (id: string, language: string): Promise<TrekChildGeometry> => {
  try {
    const result = await fetchTrekGeometry({ language }, id);
    return adaptTrekChildGeometry(id, result.geometry);
  } catch (e) {
    console.error('Error in details/connector', e);
    throw e;
  }
};
