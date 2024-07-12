import { NETWORKS_ID } from '../constant';
import { FilterWithoutType } from '../interface';
import { RawNetworks } from './interface';

export const adaptNetworksFilter = (
  rawNetworks: RawNetworks[] | null,
): FilterWithoutType | null => {
  if (rawNetworks === null) {
    return null;
  }
  return {
    id: NETWORKS_ID,
    options: rawNetworks.map(rawNetwork => ({
      value: `${rawNetwork.id}`,
      label: rawNetwork.label,
    })),
  };
};
