import { getDetailsConfig } from './config';
import { Sections, SectionsTypes } from './interface';

export const useDetailsSections = (type: keyof Sections) => {
  const { sections } = getDetailsConfig();

  const sectionsFilteredByType = (sections[type] as SectionsTypes[]).filter(
    ({ display }) => display,
  );
  const anchors = sectionsFilteredByType.filter(({ anchor }) => anchor).map(({ name }) => name);

  return {
    sections: sectionsFilteredByType,
    anchors,
  };
};
