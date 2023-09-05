import { RawGeometryObject } from 'modules/interface';
import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawOutdoorSite, RawOutdoorSiteDetails } from './interface';

const fieldsParams = {
  fields: 'id,attachments,name,geometry,themes,practice,period,wind,orientation,cities',
};

export const fetchOutdoorSites = (query: APIQuery): Promise<APIResponseForList<RawOutdoorSite>> => {
  return GeotrekAPI.get(`/outdoor_site/`, {
    params: { ...query, ...fieldsParams, ...portalsFilter },
  }).then(r => r.data);
};

const fieldsParamsDetails = {
  fields: `${fieldsParams.fields},advice,description,description_teaser,ambiance,labels,source,information_desks,web_links,courses,pdf,ratings,ratings_description,type,accessibility,children,view_points`,
  format: 'geojson',
};

export const fetchOutdoorSiteDetails = (
  query: APIQuery,
  id: string,
): Promise<RawOutdoorSiteDetails> => {
  return GeotrekAPI.get(`/outdoor_site/${encodeURIComponent(id)}/`, {
    params: { ...fieldsParamsDetails, ...query, ...portalsFilter },
  }).then(r => r.data);
};

export const fetchOutdoorSiteResult = (
  query: APIQuery,
  id: string,
): Promise<{ geometry: RawGeometryObject }> =>
  GeotrekAPI.get(`/outdoor_site/${encodeURIComponent(id)}/`, {
    params: { ...query, fields: 'geometry' },
  }).then(r => r.data);
