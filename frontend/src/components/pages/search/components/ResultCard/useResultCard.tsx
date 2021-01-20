import { routes } from 'services/routes';

export const useResultCard = (id: number, title: string) => {
  const titleWithNoSpace = title.replace(/ /g, '-');
  const detailsPageUrl = `${routes.DETAILS}-${id}-${encodeURI(titleWithNoSpace)}`;
  return { detailsPageUrl };
};
