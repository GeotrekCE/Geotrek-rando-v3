export type DetailsSectionTrekNames =
  | 'presentation'
  | 'medias'
  | 'itinerancySteps'
  | 'poi'
  | 'description'
  | 'forecastWidget'
  | 'altimetricProfile'
  | 'sensitiveAreas'
  | 'practicalInformations'
  | 'accessibility'
  | 'more'
  | 'source'
  | 'report'
  | 'touristicContent'
  | 'reservationWidget';

export type DetailsSectionTouristicContentNames =
  | 'presentation'
  | 'practicalInformations'
  | 'accessibility'
  | 'contact'
  | 'forecastWidget'
  | 'source';

export type DetailsSectionTouristicEventNames =
  | 'presentation'
  | 'description'
  | 'forecastWidget'
  | 'practicalInformations'
  | 'source'
  | 'touristicContent';

export type DetailsSectionOutdoorSiteNames =
  | 'presentation'
  | 'medias'
  | 'poi'
  | 'description'
  | 'subsites'
  | 'courses'
  | 'sensitiveAreas'
  | 'practicalInformations'
  | 'access'
  | 'forecastWidget'
  | 'source'
  | 'more'
  | 'touristicContent';

export type DetailsSectionOutdoorCourseNames =
  | 'presentation'
  | 'description'
  | 'gear'
  | 'equipment'
  | 'poi'
  | 'sensitiveAreas'
  | 'practicalInformations'
  | 'touristicContent'
  | 'forecastWidget';

interface SectionsProps {
  display: boolean;
  anchor: boolean;
  order: number;
  template?: string;
}

export type SectionsTrek = SectionsProps & {
  name: DetailsSectionTrekNames;
};

export type SectionsTouristicContent = SectionsProps & {
  name: DetailsSectionTouristicContentNames;
};

export type SectionsTouristicEvent = SectionsProps & {
  name: DetailsSectionTouristicEventNames;
};

export type SectionsOutdoorSite = SectionsProps & {
  name: DetailsSectionOutdoorSiteNames;
};

export type SectionsOutdoorCourse = SectionsProps & {
  name: DetailsSectionOutdoorCourseNames;
};

export type Sections = {
  trek: SectionsTrek[];
  touristicContent: SectionsTouristicContent[];
  touristicEvent: SectionsTouristicEvent[];
  outdoorSite: SectionsOutdoorSite[];
  outdoorCourse: SectionsOutdoorCourse[];
};

export type SectionsTypes =
  | SectionsTrek
  | SectionsTouristicContent
  | SectionsTouristicEvent
  | SectionsOutdoorSite
  | SectionsOutdoorCourse;

export type DetailsConfig = {
  sections: Sections;
};
