import { fetchViewPointMetadata } from './api';
import { ViewPoint } from './interface';

export const getViewPointMetadata = async (url: string): Promise<ViewPoint['metadata'] | null> => {
  try {
    return await fetchViewPointMetadata(url);
  } catch (e) {
    return null;
  }
};
