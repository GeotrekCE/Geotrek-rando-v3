import {
  InformationDeskType,
  InformationDeskTypeDictionnary,
  RawInformationDeskType,
} from './interface';

const adaptInformationDeskType = (
  rawInformationDeskType: RawInformationDeskType,
): InformationDeskType => ({
  label: rawInformationDeskType.label,
  pictogramUri: rawInformationDeskType.pictogram,
});

export const adaptInformationDeskTypes = (
  rawInformationDeskTypes: RawInformationDeskType[],
): InformationDeskTypeDictionnary =>
  rawInformationDeskTypes.reduce(
    (InformationDeskTypes, currentInformationDeskType) => ({
      ...InformationDeskTypes,
      [`${currentInformationDeskType.id}`]: adaptInformationDeskType(currentInformationDeskType),
    }),
    {},
  );
