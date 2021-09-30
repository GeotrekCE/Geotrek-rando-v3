import { GeotrekAPI } from 'services/api/client';
import { APIQuery } from 'services/api/interface';
import { RawDetails, RawTrekChildGeometry, RawTrekChildIds, RawTrekName } from './interface';

const fieldsParams = {
  fields:
    'id,name,departure,arrival,cities,attachments,practice,public_transport,access,advised_parking,description_teaser,ambiance,themes,duration,length_2d,ascent,difficulty,route,networks,description,geometry,parking_location,pdf,gpx,kml,departure_city,disabled_infrastructure,accessibilities,source,information_desks,labels,advice,points_reference,children,web_links',
  format: 'geojson',
};

export const fetchDetails = (query: APIQuery, id: string): Promise<RawDetails> => {
  try {
    return GeotrekAPI.url(`/trek/${id}/`)
      .query({ ...query, ...fieldsParams })
      .get()
      .notFound(() => {
        throw new Error('RESSOURCE_NOT_FOUND');
      })
      .json();
  } catch (e) {
    console.error('Error in details/api', e);
    throw e;
  }
};

export const fetchTrekChildren = (query: APIQuery, id: string): Promise<RawTrekChildIds> => {
  return GeotrekAPI.url(`/trek/${id}/`)
    .query({ ...query, fields: 'children' })
    .get()
    .json();
};

export const fetchTrekName = (query: APIQuery, id: string): Promise<RawTrekName> => {
  return GeotrekAPI.url(`/trek/${id}/`)
    .query({ ...query, fields: 'name' })
    .get()
    .json();
};

export const fetchTrekGeometry = (query: APIQuery, id: string): Promise<RawTrekChildGeometry> => {
  return GeotrekAPI.url(`/trek/${id}/`)
    .query({ ...query, format: 'geojson' })
    .get()
    .json();
};
