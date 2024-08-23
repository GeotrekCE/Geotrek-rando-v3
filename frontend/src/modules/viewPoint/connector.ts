import { adaptViewPointsCategories } from './adapter';
import { fetchViewPointCategories, fetchViewPointMetadata } from './api';
import { ViewPoint, ViewPointCategories } from './interface';

export const getViewPointMetadata = async (url: string): Promise<ViewPoint['metadata'] | null> => {
  try {
    return await fetchViewPointMetadata(url);
  } catch (e) {
    return null;
  }
};

export const getViewPointCategories = async (
  language: string,
): Promise<ViewPointCategories | null> => {
  try {
    const rawViewPointsCategories = await fetchViewPointCategories({ language });
    return adaptViewPointsCategories(rawViewPointsCategories.results);
  } catch (e) {
    return null;
  }
};
