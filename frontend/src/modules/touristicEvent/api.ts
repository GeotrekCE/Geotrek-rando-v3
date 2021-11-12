import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTouristicEvent, RawTouristicEventDetails } from './interface';

const fieldsParams = {
  fields: 'id,attachments,name,geometry,themes,cities,type,begin_date,end_date,approved',
};

export const fetchTouristicEvents = (
  query: APIQuery,
): Promise<APIResponseForList<RawTouristicEvent>> =>
  GeotrekAPI.url(`/touristicevent`)
    .query({
      ...query,
      ...fieldsParams,
      ...portalsFilter,
      dates_after: '2021-11-10', // @FIXME
    })
    .get()
    .json();

const fieldsParamsDetails = {
  fields: `${fieldsParams.fields},description,description_teaser,participant_number,pdf,meeting_point,duration,source,contact,email,website,accessibility,organizer,speaker,target_audience,practical_info,booking,meeting_time`,
  format: 'geojson',
};

export const fetchTouristicEventDetails = (
  query: APIQuery,
  id: string,
): Promise<RawTouristicEventDetails> =>
  GeotrekAPI.url(`/touristicevent/${id}/`)
    .query({ ...query, ...fieldsParamsDetails })
    .get()
    .notFound(() => {
      throw new Error('RESSOURCE_NOT_FOUND');
    })
    .json();
