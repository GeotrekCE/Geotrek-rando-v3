import { generateFlatPageUrl } from 'modules/header/utills';
import { SourceDictionnary } from 'modules/source/interface';
import { MenuItem } from 'modules/menuItems/interface';
import { isInternalFlatPageUrl } from 'services/routeUtils';
import { FlatPageDetails, RawFlatPage, RawFlatPageDetails } from './interface';

const adaptFlatPageToMenuItem = (rawFlatPage: RawFlatPage) => {
  const url = rawFlatPage.external_url || generateFlatPageUrl(rawFlatPage.id, rawFlatPage.title);
  return {
    url,
    title: rawFlatPage.title,
    id: rawFlatPage.id,
    openInAnotherTab: !isInternalFlatPageUrl(url),
    pictogram: null,
    thumbnail: null,
  };
};

export const adaptFlatPages = (rawFlatPages: RawFlatPage[]): MenuItem[] => {
  return rawFlatPages
    .sort((menuItemA, menuItemB) => (menuItemA.order ?? Infinity) - (menuItemB.order ?? Infinity))
    .map(adaptFlatPageToMenuItem);
};

export const adaptFlatPageDetails = ({
  rawFlatPageDetails,
  sourceDictionnary,
  rawFlatPageChildrenDetails,
}: {
  rawFlatPageDetails: RawFlatPageDetails;
  sourceDictionnary: SourceDictionnary;
  rawFlatPageChildrenDetails: RawFlatPageDetails[];
}): FlatPageDetails => ({
  id: rawFlatPageDetails.id,
  title: rawFlatPageDetails.title,
  content: rawFlatPageDetails.content,
  sources: rawFlatPageDetails.source.map(sourceId => sourceDictionnary[sourceId]).filter(Boolean),
  attachment:
    rawFlatPageDetails.attachments.length > 0 && rawFlatPageDetails.attachments[0].type === 'image'
      ? rawFlatPageDetails.attachments[0].url
      : null,
  children: rawFlatPageChildrenDetails.map(child => ({
    id: child.id,
    title: child.title,
    content: child.content,
    sources: child.source.map(sourceId => sourceDictionnary[sourceId]).filter(Boolean),
    attachment:
      child.attachments.length > 0 && child.attachments[0].type === 'image'
        ? child.attachments[0].thumbnail
        : null,
  })),
});
