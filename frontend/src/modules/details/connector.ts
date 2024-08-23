import { fetchAccessibilityLevel } from 'modules/accessibility/api';
import { getAccessibilities } from 'modules/accessibility/connector';
import { getActivity } from 'modules/activities/connector';
import { getCourseType } from 'modules/filters/courseType/connector';
import { getDifficulty } from 'modules/filters/difficulties/connector';
import { getNetworks } from 'modules/networks/connector';
import { getPois } from 'modules/poi/connector';
import { getTrekResultsById } from 'modules/results/connector';
import { getSensitiveAreas } from 'modules/sensitiveArea/connector';
import { getSignage } from 'modules/signage/connector';
import { getService } from 'modules/service/connector';
import { getInfrastructure } from 'modules/infrastructure/connector';
import { getGlobalConfig } from 'modules/utils/api.config';
import { getTouristicContentsNearTarget } from 'modules/touristicContent/connector';
import { CommonDictionaries } from 'modules/dictionaries/interface';
import { adaptViewPoints } from 'modules/viewPoint/adapter';
import { getTrekRating } from '../trekRating/connector';
import { getTrekRatingScale } from '../trekRatingScale/connector';
import { adaptChildren, adaptResults, adaptTrekChildGeometry } from './adapter';
import { fetchDetails, fetchTrekChildren, fetchTrekGeometry, fetchTrekName } from './api';
import { Details, TrekChildGeometry, TrekFamily } from './interface';
import { getObjectsRelatedToItinerantTreksToDisplay } from './utils';

export const getDetails = async (
  id: string,
  language: string,
  commonDictionaries?: CommonDictionaries,
): Promise<Details> => {
  try {
    const {
      themes = {},
      cities = {},
      sources = [],
      informationDesk = {},
      labels = {},
    } = commonDictionaries ?? {};

    const rawDetails = await fetchDetails({ language }, id);
    const {
      displayRelatedPOIs,
      displayRelatedTouristicContents,
      displayRelatedSensitiveAreas,
      displayRelatedInfrastructures,
      displayRelatedSignages,
      displayRelatedServices,
    } = getObjectsRelatedToItinerantTreksToDisplay(rawDetails.properties.children);

    // Dictionaries related to Treks
    const [networks, trekRating, trekRatingScale, accessibilities] = await Promise.all([
      getNetworks(language),
      getTrekRating(language),
      getTrekRatingScale(language),
      getAccessibilities(language),
    ]);

    const viewPoints = await adaptViewPoints(language, rawDetails.properties.view_points ?? []);

    const [
      activity,
      difficulty,
      courseType,
      pois,
      touristicContents,
      signage,
      service,
      infrastructure,
      children,
      sensitiveAreas,
    ] = await Promise.all([
      getActivity(rawDetails.properties.practice, language),
      getDifficulty(rawDetails.properties.difficulty, language),
      getCourseType(rawDetails.properties.route, language),
      displayRelatedPOIs === true ? getPois(rawDetails.properties.id, language) : [],
      displayRelatedTouristicContents === true
        ? getTouristicContentsNearTarget(rawDetails.properties.id, language)
        : [],
      displayRelatedSignages === true ? getSignage(language, id, 'TREK') : null,
      displayRelatedServices === true ? getService(language, id, 'TREK') : null,
      displayRelatedInfrastructures === true ? getInfrastructure(language, id, 'TREK') : null,
      getTrekResultsById(rawDetails.properties.children, language, networks, commonDictionaries),
      getGlobalConfig().enableSensitiveAreas && displayRelatedSensitiveAreas === true
        ? getSensitiveAreas('trek', rawDetails.properties.id, language)
        : [],
    ]);
    const childrenGeometry = await Promise.all(
      rawDetails.properties.children.map(childId => getChildGeometry(`${childId}`, language)),
    );

    const accessbilityLevel =
      rawDetails.properties.accessibility_level !== null
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
      cityDictionnary: cities,
      accessibilityDictionnary: accessibilities,
      sourceDictionnary: sources,
      informationDeskDictionnary: informationDesk,
      labelsDictionnary: labels,
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
      viewPoints,
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
