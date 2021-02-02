import {
  InformationDeskType,
  InformationDeskTypeDictionnary,
} from 'modules/informationDeskType/interface';
import { InformationDesk, InformationDeskDictionnary, RawInformationDesk } from './interface';

const adaptInformationDesk = (
  rawInformationDesk: RawInformationDesk,
  informationDeskTypes: InformationDeskTypeDictionnary,
): InformationDesk => ({
  name: rawInformationDesk.name,
  street: rawInformationDesk.street,
  postalCode: rawInformationDesk.postal_code,
  municipality: rawInformationDesk.municipality,
  website: rawInformationDesk.website,
  phone: rawInformationDesk.phone,
  description: rawInformationDesk.description,
  type: informationDeskTypes[rawInformationDesk.type],
});

export const adaptInformationDesks = ({
  rawInformationDesks,
  informationDeskTypes,
}: {
  rawInformationDesks: RawInformationDesk[];
  informationDeskTypes: InformationDeskTypeDictionnary;
}): InformationDeskDictionnary =>
  rawInformationDesks.reduce(
    (InformationDesks, currentInformationDesk, currentIndex) => ({
      ...InformationDesks,
      [currentIndex + 1]: adaptInformationDesk(currentInformationDesk, informationDeskTypes),
    }),
    {},
  );
