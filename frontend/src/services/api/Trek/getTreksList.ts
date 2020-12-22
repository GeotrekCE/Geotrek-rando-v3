import { TreksList } from 'domain/Trek/Trek';
import { apiRoutes } from '../apiRoutes';
import { apiClient } from '../client';

interface getTreksListData {
  language: string;
  page: number;
  page_size: number;
}

export const getTreksList = async (params: getTreksListData): Promise<TreksList | undefined> => {
  const result = await apiClient.get<{
    count: number;
    next: string | null;
    previous: string | null;
    results: TreksList;
  }>(apiRoutes.getTrekList, { params: { ...params, format: 'json' } });
  return result.data.results;
};
