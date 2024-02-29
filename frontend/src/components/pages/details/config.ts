import getNextConfig from 'next/config';
import {
  DetailsConfig,
  SectionsOutdoorCourse,
  SectionsOutdoorSite,
  SectionsTouristicContent,
  SectionsTouristicEvent,
  SectionsTrek,
  SectionsTypes,
} from './interface';

export const getDetailsConfig = (language: string): DetailsConfig => {
  const {
    publicRuntimeConfig: { details, detailsSectionHtml },
  } = getNextConfig();

  const destailsSection = (sections: SectionsTypes[]) =>
    sections.map(item => {
      if (detailsSectionHtml[item.name]) {
        return {
          ...item,
          template:
            detailsSectionHtml[item.name][language] ?? detailsSectionHtml[item.name].default,
        };
      }
      return item;
    });

  return {
    ...details,
    sections: {
      outdoorCourse: destailsSection(details.sections.outdoorCourse as SectionsOutdoorCourse[]),
      outdoorSite: destailsSection(details.sections.outdoorSite as SectionsOutdoorSite[]),
      touristicContent: destailsSection(
        details.sections.touristicContent as SectionsTouristicContent[],
      ),
      touristicEvent: destailsSection(details.sections.touristicEvent as SectionsTouristicEvent[]),
      trek: destailsSection(details.sections.trek as SectionsTrek[]),
    },
  };
};
