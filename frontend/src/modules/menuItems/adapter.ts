import { generateFlatPageUrl } from 'modules/header/utills';
import { MenuItem, RawMenuItem } from './interface';

const getLinkFromRawMenuItem = (rawMenuItems: RawMenuItem) => {
  if (rawMenuItems.target_type === 'page') {
    return generateFlatPageUrl(rawMenuItems.page, rawMenuItems.page_title);
  }
  return rawMenuItems.link_url;
};

const adaptMenuItem = (rawMenuItems: RawMenuItem): MenuItem => ({
  url: getLinkFromRawMenuItem(rawMenuItems),
  title: rawMenuItems.label,
  id: rawMenuItems.id,
  openInAnotherTab: rawMenuItems.open_in_new_tab,
  children: rawMenuItems.children?.map(adaptMenuItem),
});

export const adaptMenuItems = (rawMenuItems: RawMenuItem[]): MenuItem[] => {
  return rawMenuItems.map(adaptMenuItem);
};
