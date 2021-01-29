import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawDetails } from './interface';

const fieldsParams = {
  fields:
    'id,name,departure,attachments,practice,public_transport,access,advised_parking,description_teaser,ambiance,themes,duration,length_2d,ascent,difficulty,route,networks,description,geometry,parking_location,pdf,gpx,kml',
};

export const fetchDetails = (query: APIQuery, id: string): Promise<RawDetails> =>
  GeotrekAPI.url(`/trek/${id}/`)
    .query({ ...query, ...fieldsParams })
    .get()
    .json();
