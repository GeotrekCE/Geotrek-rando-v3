import { generateFlatPageUrl } from 'modules/header/utills';
import { RawFlatPage } from './interface';
import { MenuItem } from '../header/interface';

const DEFAULT_ORDER_VALUE = 100000;

const adaptFlatPageToMenuItem = (rawFlatPage: RawFlatPage): MenuItem => ({
  url:
    rawFlatPage.external_url !== null && rawFlatPage.external_url.length > 0
      ? rawFlatPage.external_url
      : generateFlatPageUrl(rawFlatPage.id, rawFlatPage.title),
  title: rawFlatPage.title,
  order: rawFlatPage.order ?? DEFAULT_ORDER_VALUE,
});

export const adaptFlatPages = (rawFlatPages: RawFlatPage[]): MenuItem[] =>
  rawFlatPages
    .map(adaptFlatPageToMenuItem)
    .sort((menuItemA, menuItemB) => menuItemA.order - menuItemB.order);
