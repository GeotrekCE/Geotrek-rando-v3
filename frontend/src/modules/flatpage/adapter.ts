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
