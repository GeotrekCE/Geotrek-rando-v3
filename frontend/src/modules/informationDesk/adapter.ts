import { adaptInformationDeskType } from 'modules/informationDeskType/adapter';
import { concatResults } from 'modules/utils/adapter';
import { APIResponseForList } from 'services/api/interface';
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

export const adaptInformationDeskList = (
  rawInformationDesk: APIResponseForList<RawInformationDesk>[],
): InformationDeskDictionnary =>
  concatResults<RawInformationDesk>(rawInformationDesk).reduce(
    (informationDesk, current) => ({
      ...informationDesk,
      [`${current.id}`]: adaptInformationDesk(current),
    }),
    {},
  );

export const adaptInformationDesks = ({
  rawInformationDesks,
}: {
  rawInformationDesks: RawInformationDesk[];
}): InformationDeskDictionnary =>
  rawInformationDesks.reduce(
    (InformationDesks, currentInformationDesk) => ({
      ...InformationDesks,
      [currentInformationDesk.id]: adaptInformationDesk(currentInformationDesk),
    }),
    {},
  );
