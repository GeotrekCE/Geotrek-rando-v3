import { fetchFlatPages } from 'modules/flatpage/api';
import { adaptFlatPages } from 'modules/flatpage/adapter';
import { fetchMenuItems } from './api';
import { adaptMenuItems } from './adapter';
import { MenuItem } from './interface';

export const geMenuItems = async (language: string): Promise<MenuItem[]> => {
  try {
    const RawMenuItems = await fetchMenuItems({ language });
    return adaptMenuItems(RawMenuItems);
    // Old version of menuItems before GTA version 2.104
  } catch (error) {
    const RawFlatPages = await fetchFlatPages({ language });
    return adaptFlatPages(RawFlatPages.results);
  }
};
