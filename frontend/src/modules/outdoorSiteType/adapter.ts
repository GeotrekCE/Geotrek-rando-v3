import { OutdoorSiteTypeChoices, RawOutdoorSiteType } from './interface';

export const adaptOutdoorSiteType = ({
  rawOutdoorSiteType,
}: {
  rawOutdoorSiteType: RawOutdoorSiteType[];
}): OutdoorSiteTypeChoices =>
  rawOutdoorSiteType.reduce(
    (items, item) => ({
      ...items,
      [item.id]: item,
    }),
    {} as OutdoorSiteTypeChoices,
  );
