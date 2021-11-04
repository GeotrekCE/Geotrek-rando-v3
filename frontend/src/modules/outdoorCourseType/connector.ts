import { getGlobalConfig } from '../utils/api.config';
import { adaptOutdoorCourseType } from './adapter';
import { fetchOutdoorCourseType } from './api';
import { OutdoorCourseTypeChoices } from './interface';

export const getOutdoorCourseType = async (language: string): Promise<OutdoorCourseTypeChoices> => {
  const [rawOutdoorCourseTypeResult] = await Promise.all([
    getGlobalConfig().enableOutdoor ? fetchOutdoorCourseType({ language }) : null,
  ]);

  return adaptOutdoorCourseType({
    rawOutdoorCourseType: rawOutdoorCourseTypeResult?.results ?? [],
  });
};
