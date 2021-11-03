import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawOutdoorSite, RawOutdoorSiteDetails } from './interface';

const fieldsParams = {
  fields: 'id,attachments,name,geometry,themes,practice,period,wind,orientation',
};

export const fetchOutdoorSites = (query: APIQuery): Promise<APIResponseForList<RawOutdoorSite>> => {
  return GeotrekAPI.url(`/outdoor_site`)
    .query({ ...query, ...fieldsParams, ...portalsFilter })
    .get()
    .json();
};

const fieldsParamsDetails = {
  fields: `${fieldsParams.fields},advice,description,description_teaser,ambiance,labels,source,information_desks,web_links,courses,pdf`,
  format: 'geojson',
};

export const fetchOutdoorSiteDetails = (
  query: APIQuery,
  id: string,
): Promise<RawOutdoorSiteDetails> =>
  GeotrekAPI.url(`/outdoor_site/${id}/`)
    .query({ ...query, ...fieldsParamsDetails })
    .get()
    .notFound(() => {
      throw new Error('RESSOURCE_NOT_FOUND');
    })
    .json();
