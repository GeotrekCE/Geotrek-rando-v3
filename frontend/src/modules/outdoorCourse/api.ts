import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawOutdoorCourse, RawOutdoorCourseDetails } from './interface';

const fieldsParams = {
  fields: 'id,attachments,name,geometry',
};

export const fetchOutdoorCourses = (
  query: APIQuery,
): Promise<APIResponseForList<RawOutdoorCourse>> =>
  GeotrekAPI.url(`/outdoor_course`)
    .query({ ...query, ...fieldsParams, ...portalsFilter })
    .get()
    .json();

const fieldsParamsDetails = {
  fields: `${fieldsParams.fields},advice,description,duration,equipment,gear,height,length,max_elevation,min_elevation,ratings,ratings_description,site,structure,type,url`,
  format: 'geojson',
};

export const fetchOutdoorCourseDetails = (
  query: APIQuery,
  id: string,
): Promise<RawOutdoorCourseDetails> =>
  GeotrekAPI.url(`/outdoor_course/${id}/`)
    .query({ ...query, ...fieldsParamsDetails })
    .get()
    .notFound(() => {
      throw new Error('RESSOURCE_NOT_FOUND');
    })
    .json();
