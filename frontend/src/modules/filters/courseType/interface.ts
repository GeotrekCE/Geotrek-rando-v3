export interface RawCourseTypes {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawCourseType[];
}

export interface RawCourseType {
  id: number;
  pictogram: string;
  route: string;
}
