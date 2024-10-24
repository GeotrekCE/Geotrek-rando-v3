import { routes } from 'services/routes';
import { ContentType } from 'modules/interface';
import { convertStringForSitemap, generateResultDetailsUrl } from '../search/utils';

/** Computes an element top pixel and bottom pixel position */
export const getDimensions = (htmlElement: HTMLElement | null): { top: number; bottom: number } => {
  if (htmlElement === null) return { top: 0, bottom: 0 };
  const { height } = htmlElement.getBoundingClientRect();
  const elementTopPosition = htmlElement.offsetTop;
  const elementBottomPosition = elementTopPosition + height;

  return {
    top: elementTopPosition,
    bottom: elementBottomPosition,
  };
};

/** Generates the details page url for a trek part of an itinerance */
export const generateChildrenDetailsUrl = (
  id: string | number,
  title: string,
  parentId: string,
): string => {
  const detailsUrl = generateResultDetailsUrl(id, title);
  return `${detailsUrl}?parentId=${parentId}`;
};

export const generateTouristicContentUrl = (id: number | string, title: string): string => {
  const titleWithNoSpace = convertStringForSitemap(title);
  return `${routes.TOURISTIC_CONTENT}/${id}-${encodeURIComponent(titleWithNoSpace)}`;
};

export const generateOutdoorSiteUrl = (id: number | string, title: string): string => {
  const titleWithNoSpace = convertStringForSitemap(title);
  return `${routes.OUTDOOR_SITE}/${id}-${encodeURIComponent(titleWithNoSpace)}`;
};

export const generateOutdoorCourseUrl = (id: number | string, title: string): string => {
  const titleWithNoSpace = convertStringForSitemap(title);
  return `${routes.OUTDOOR_COURSE}/${id}-${encodeURIComponent(titleWithNoSpace)}`;
};

export const generateTouristicEventUrl = (id: number | string, title: string): string => {
  const titleWithNoSpace = convertStringForSitemap(title);
  return `${routes.TOURISTIC_EVENT}/${id}-${encodeURIComponent(titleWithNoSpace)}`;
};

export const generateDetailsUrlFromType = (
  type: ContentType,
  id: number | string,
  title: string,
  params?: Record<string, string>,
): string => {
  const searchParams = params ? `?${new URLSearchParams(params).toString()}` : '';
  const titleWithNoSpace = convertStringForSitemap(title);
  return `${routes[type]}/${id}-${encodeURIComponent(titleWithNoSpace)}${searchParams}`;
};

export const templatesVariablesAreDefinedAndUsed = ({
  template,
  ...variables
}: {
  template?: string;
  id: string;
  cityCode?: string;
}) => {
  if (!template) {
    return false;
  }
  return Object.entries(variables).every(
    ([key, value]) => !template.includes(`{{ ${key} }}`) || value,
  );
};
