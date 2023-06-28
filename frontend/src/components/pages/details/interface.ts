export type DetailsSectionTrekNames =
  | 'presentation'
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

export interface DetailsConfig {
  sections: {
    trek: {
      name: DetailsSectionTrekNames;
      display: boolean;
      anchor: boolean;
      order: number;
    }[];
    touristicContent: {
      name: DetailsSectionTouristicContentNames;
      display: boolean;
      anchor: boolean;
      order: number;
    }[];
    touristicEvent: {
      name: DetailsSectionTouristicEventNames;
      display: boolean;
      anchor: boolean;
      order: number;
    }[];
    outdoorSite: {
      name: DetailsSectionOutdoorSiteNames;
      display: boolean;
      anchor: boolean;
      order: number;
    }[];
    outdoorCourse: {
      name: DetailsSectionOutdoorCourseNames;
      display: boolean;
      anchor: boolean;
      order: number;
    }[];
  };
}
