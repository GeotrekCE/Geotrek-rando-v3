import { useIntl } from 'react-intl';
import { Details } from 'modules/details/interface';
import { TouristicContentDetails } from 'modules/touristicContent/interface';
import { getDetailsConfig } from './config';
import { Sections, SectionsTypes } from './interface';

export const useDetailsSections = (
  type: keyof Sections,
  details?: Details | TouristicContentDetails,
) => {
  const { locale } = useIntl();
  const { sections } = getDetailsConfig(locale);

  const sectionsFilteredByType = (sections[type] as SectionsTypes[]).filter(
    ({ display, name }) => {
      if (!display) return false;
      if (name === 'vigilance') {
        return Boolean(details?.publishedVigilanceAreas && details.publishedVigilanceAreas.length > 0);
      }
      return true;
    },
  );
  const anchors = sectionsFilteredByType.filter(({ anchor }) => anchor).map(({ name }) => name);

  return {
    sections: sectionsFilteredByType,
    anchors,
  };
};
