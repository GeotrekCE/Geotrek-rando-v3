import { generateFlatPageUrl } from 'modules/header/utills';
import { RawFlatPage } from './interface';
import { MenuItem, OrderableMenuItem } from '../header/interface';

const adaptFlatPageToMenuItem = (rawFlatPage: RawFlatPage): MenuItem => ({
  url:
    rawFlatPage.external_url !== null && rawFlatPage.external_url.length > 0
      ? rawFlatPage.external_url
      : generateFlatPageUrl(rawFlatPage.id, rawFlatPage.title),
  title: rawFlatPage.title,
  order: rawFlatPage.order,
});

export const adaptFlatPages = (rawFlatPages: RawFlatPage[]): MenuItem[] => {
  const menuItemsUnsorted = rawFlatPages.map(adaptFlatPageToMenuItem);
  const menuItemsNullOrder = menuItemsUnsorted.filter(menuItem => menuItem.order === null);
  const menuItemsWithOrder = menuItemsUnsorted
    .filter(isOrderableMenuItem)
    .sort((menuItemA, menuItemB) => menuItemA.order - menuItemB.order);
  return [...menuItemsWithOrder, ...menuItemsNullOrder];
};

const isOrderableMenuItem = (item: MenuItem): item is OrderableMenuItem => item.order !== null;
