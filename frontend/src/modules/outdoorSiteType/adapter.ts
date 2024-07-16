import { OutdoorSiteTypeChoices, RawOutdoorSiteType } from './interface';

export const adaptOutdoorSiteType = ({
  rawOutdoorSiteType,
}: {
  rawOutdoorSiteType: RawOutdoorSiteType[];
}): OutdoorSiteTypeChoices =>
  Object.fromEntries(rawOutdoorSiteType.map(item => [item.id, item]));
