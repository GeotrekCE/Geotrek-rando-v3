import { adaptInformationDeskType } from 'modules/informationDeskType/adapter';
import { InformationDesk, InformationDeskDictionnary, RawInformationDesk } from './interface';

const adaptInformationDesk = (rawInformationDesk: RawInformationDesk): InformationDesk => ({
  accessibility: rawInformationDesk.accessibility ?? null,
  name: rawInformationDesk.name,
  street: rawInformationDesk.street,
  postalCode: rawInformationDesk.postal_code,
  municipality: rawInformationDesk.municipality,
  website: rawInformationDesk.website,
  email: rawInformationDesk.email,
  phone: rawInformationDesk.phone,
  description: rawInformationDesk.description,
  photoUrl: rawInformationDesk.photo_url,
  type: adaptInformationDeskType(rawInformationDesk.type),
  latitude: rawInformationDesk.latitude,
  longitude: rawInformationDesk.longitude,
});

export const adaptInformationDesks = (
  rawInformationDesks: RawInformationDesk[]
): InformationDeskDictionnary =>
  Object.fromEntries(rawInformationDesks.map(informationDesk => [informationDesk.id, adaptInformationDesk(informationDesk)]))
