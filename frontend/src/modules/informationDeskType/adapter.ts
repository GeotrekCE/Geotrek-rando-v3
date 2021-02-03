import { InformationDeskType, RawInformationDeskType } from './interface';

export const adaptInformationDeskType = (
  rawInformationDeskType: RawInformationDeskType,
): InformationDeskType => ({
  label: rawInformationDeskType.label,
  pictogramUri: rawInformationDeskType.pictogram,
});
