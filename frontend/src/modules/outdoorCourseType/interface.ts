export interface RawOutdoorCourseType {
  id: string;
  name: string;
  practice: number;
}

export interface OutdoorCourseType {
  id: string;
  name: string;
  practice: number;
}

export interface OutdoorCourseTypeChoices {
  [value: string]: OutdoorCourseType;
}
