import { apiRoutes } from '../apiRoutes';
import { apiClient } from '../client';

interface getPOIListData {
  language: string;
  page: number;
  page_size: number;
}

export const getPOIList = async (params: getPOIListData): Promise<string[] | undefined> => {
  const result = await apiClient.get<{
    count: number;
    next: string | null;
    previous: string | null;
    results: string[];
  }>(apiRoutes.getPOIList, { params: { ...params, format: 'json' } });
  return result.data.results;
};
