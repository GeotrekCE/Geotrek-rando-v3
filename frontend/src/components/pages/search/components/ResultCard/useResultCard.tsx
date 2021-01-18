import { routes } from 'services/routes';

export const useResultCard = (id: number, title: string) => {
  const detailsPageUrl = `${routes.DETAILS}-${id}-${encodeURI(title)}`;
  return { detailsPageUrl };
};
