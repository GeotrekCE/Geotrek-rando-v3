import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawOutdoorCourseType } from './interface';

const fieldsParams = {
  fields: 'id,name,practice',
};

export const fetchOutdoorCourseType = (
  query: APIQuery,
): Promise<APIResponseForList<RawOutdoorCourseType>> =>
  GeotrekAPI.url(`/outdoor_coursetype`)
    .query({ ...query, ...fieldsParams, ...portalsFilter })
    .get()
    .json();
