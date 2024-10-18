import { RawGeometryObject } from 'modules/interface';
import { portalsFilter } from 'modules/utils/api.config';
import { GeotrekAPI } from 'services/api/client';
import { APIQuery, APIResponseForList } from 'services/api/interface';
import { RawTouristicEvent, RawTouristicEventDetails } from './interface';

const fieldsParams = {
  fields: [
    'id',
    'attachments',
    'name',
    'geometry',
    'themes',
    'cities',
    'type',
    'begin_date',
    'end_date',
    'approved',
    'start_time',
    'end_time',
  ].join(','),
};

export const fetchTouristicEvents = (
  query: APIQuery,
): Promise<APIResponseForList<RawTouristicEvent>> => {
  return GeotrekAPI.get('/touristicevent/', {
    params: {
      ...query,
      ...fieldsParams,
      ...portalsFilter,
    },
  }).then(r => r.data);
};

const fieldsParamsDetails = {
  fields: [
    fieldsParams.fields,
    'description',
    'description_teaser',
    'participant_number',
    'pdf',
    'meeting_point',
    'duration',
    'source',
    'contact',
    'email',
    'website',
    'accessibility',
    'organizer',
    'speaker',
    'target_audience',
    'practical_info',
    'booking',
  ].join(','),
  format: 'geojson',
};

export const fetchTouristicEventDetails = (
  query: APIQuery,
  id: string,
): Promise<RawTouristicEventDetails> =>
  GeotrekAPI.get(`/touristicevent/${encodeURIComponent(id)}/`, {
    params: { ...query, ...fieldsParamsDetails, ...portalsFilter },
  }).then(r => r.data);

export const fetchTouristicEventResult = (
  query: APIQuery,
  id: string,
): Promise<{ geometry: RawGeometryObject }> =>
  GeotrekAPI.get(`/touristicevent/${encodeURIComponent(id)}/`, {
    params: { ...query, fields: 'geometry' },
  }).then(r => r.data);
