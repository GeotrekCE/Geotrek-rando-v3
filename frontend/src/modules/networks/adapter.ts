import { Network, NetworkDictionnary, RawNetwork } from './interface';

const adaptNetwork = (rawNetwork: RawNetwork): Network => ({
  label: rawNetwork.label,
  pictogramUri: rawNetwork.pictogram,
});

export const adaptNetworks = (rawNetworks: RawNetwork[]): NetworkDictionnary =>
  rawNetworks.reduce(
    (networks, currentNetwork) => ({
      ...networks,
      [`${currentNetwork.id}`]: adaptNetwork(currentNetwork),
    }),
    {},
  );
