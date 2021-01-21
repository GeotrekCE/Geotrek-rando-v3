import { getActivity } from 'modules/activities/connector';
import { getCourseType } from 'modules/filters/courseType/connector';
import { getDifficulty } from 'modules/filters/difficulties/connector';
import { getThemes } from 'modules/filters/theme/connector';
import { adaptResults } from './adapter';
import { fetchDetails } from './api';
import { Details } from './interface';

export const getDetails = async (id: string): Promise<Details> => {
  const rawDetails = await fetchDetails({ language: 'fr' }, id);
  const [activity, difficulty, courseType, themes] = await Promise.all([
    getActivity(rawDetails.practice),
    getDifficulty(rawDetails.difficulty),
    getCourseType(rawDetails.route),
    getThemes(),
  ]);
  return adaptResults({ rawDetails, activity, difficulty, courseType, themes });
};
