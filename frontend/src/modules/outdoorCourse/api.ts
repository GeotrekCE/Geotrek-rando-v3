import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawOutdoorCourse, RawOutdoorCourseDetails } from './interface';

const fieldsParams = {
  fields: 'id,attachments,name,geometry,duration,max_elevation,length,height,cities',
};

export const fetchOutdoorCourses = (
  query: APIQuery,
): Promise<APIResponseForList<RawOutdoorCourse>> =>
  GeotrekAPI.get(`/outdoor_course`, {
    params: { ...query, ...fieldsParams, ...portalsFilter },
  }).then(r => r.data);

const fieldsParamsDetails = {
  fields: `${fieldsParams.fields},advice,description,equipment,gear,min_elevation,ratings,ratings_description,site,structure,type,url,children,pdf,accessibility`,
  format: 'geojson',
};

export const fetchOutdoorCourseDetails = (
  query: APIQuery,
  id: string,
): Promise<RawOutdoorCourseDetails> =>
  GeotrekAPI.get(`/outdoor_course/${id}/`, { params: { ...query, ...fieldsParamsDetails } }).then(
    r => r.data,
  );
