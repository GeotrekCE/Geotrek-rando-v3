import { Network, NetworkDictionnary, RawNetwork } from './interface';

const adaptNetwork = (rawNetwork: RawNetwork): Network => ({
  label: rawNetwork.label,
  pictogramUri: rawNetwork.pictogram,
});

export const adaptNetworks = (rawNetworks: RawNetwork[]): NetworkDictionnary =>
  Object.fromEntries(rawNetworks.map(network => [network.id, adaptNetwork(network)]));
