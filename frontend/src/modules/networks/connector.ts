import { adaptNetworks } from './adapter';
import { fetchNetworks } from './api';
import { NetworkDictionnary } from './interface';

export const getNetworks = async (): Promise<NetworkDictionnary> => {
  const rawNetworks = await fetchNetworks({ language: 'fr' });
  return adaptNetworks(rawNetworks.results);
};
