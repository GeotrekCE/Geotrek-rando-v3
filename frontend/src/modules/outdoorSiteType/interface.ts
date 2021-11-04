export interface RawOutdoorSiteType {
  id: string;
  name: string;
  practice: number;
}

export interface OutdoorSiteType {
  id: string;
  name: string;
  practice: number;
}

export interface OutdoorSiteTypeChoices {
  [value: string]: OutdoorSiteType;
}
