import { adaptInformationDeskType } from 'modules/informationDeskType/adapter';
import { InformationDesk, InformationDeskDictionnary, RawInformationDesk } from './interface';

const adaptInformationDesk = (rawInformationDesk: RawInformationDesk): InformationDesk => ({
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
});

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
