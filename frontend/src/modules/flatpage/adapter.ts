import { generateFlatPageUrl } from 'modules/header/utills';
import { SourceDictionnary } from 'modules/source/interface';
import { FlatPageDetails, RawFlatPage, RawFlatPageDetails } from './interface';
import { MenuItem, OrderableMenuItem } from '../header/interface';

const adaptFlatPageToMenuItem = (rawFlatPage: RawFlatPage): MenuItem => ({
  url:
    rawFlatPage.external_url !== null && rawFlatPage.external_url.length > 0
      ? rawFlatPage.external_url
      : generateFlatPageUrl(rawFlatPage.id, rawFlatPage.title),
  title: rawFlatPage.title,
  order: rawFlatPage.order,
  id: rawFlatPage.id,
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

export const adaptFlatPageDetails = ({
  rawFlatPageDetails,
  sourceDictionnary,
}: {
  rawFlatPageDetails: RawFlatPageDetails;
  sourceDictionnary: SourceDictionnary;
}): FlatPageDetails => ({
  id: rawFlatPageDetails.id,
  title: rawFlatPageDetails.title,
  content: rawFlatPageDetails.content,
  sources: rawFlatPageDetails.source.map(sourceId => sourceDictionnary[sourceId]),
  attachment:
    rawFlatPageDetails.attachments.length > 0 && rawFlatPageDetails.attachments[0].type === 'image'
      ? rawFlatPageDetails.attachments[0].url
      : null,
});
