import getNextConfig from 'next/config';
import { DetailsConfig, SectionsTypes } from './interface';

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
      outdoorCourse: destailsSection(details.sections.outdoorCourse),
      outdoorSite: destailsSection(details.sections.outdoorSite),
      touristicContent: destailsSection(details.sections.touristicContent),
      touristicEvent: destailsSection(details.sections.touristicEvent),
      trek: destailsSection(details.sections.trek),
    },
  };
};
