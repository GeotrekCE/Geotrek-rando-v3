import { adaptNetworks } from './adapter';
import { fetchNetworks } from './api';
import { NetworkDictionnary } from './interface';

export const getNetworks = async (language: string): Promise<NetworkDictionnary> => {
  const rawNetworks = await fetchNetworks({ language });
  return adaptNetworks(rawNetworks.results);
};
