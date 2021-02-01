import { getActivity } from 'modules/activities/connector';
import { getCities } from 'modules/city/connector';
import { getCourseType } from 'modules/filters/courseType/connector';
import { getDifficulty } from 'modules/filters/difficulties/connector';
import { getThemes } from 'modules/filters/theme/connector';
import { getNetworks } from 'modules/networks/connector';
import { getPois } from 'modules/poi/connector';
import { getTouristicContents } from 'modules/touristicContent/connector';
import { adaptResults } from './adapter';
import { fetchDetails } from './api';
import { Details } from './interface';

export const getDetails = async (id: string): Promise<Details> => {
  const rawDetails = await fetchDetails({ language: 'fr' }, id);
  const [
    activity,
    difficulty,
    courseType,
    networks,
    themes,
    pois,
    touristicContents,
    cityDictionnary,
  ] = await Promise.all([
    getActivity(rawDetails.practice),
    getDifficulty(rawDetails.difficulty),
    getCourseType(rawDetails.route),
    getNetworks(),
    getThemes(),
    getPois(rawDetails.id),
    getTouristicContents(rawDetails.id),
    getCities(),
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
  });
};
