import { RawNodeConfig } from 'types/node';
import { StaticNetworkIds } from 'types/network';

export const makeNodeName = (network: string, name: string) => {
  return `${network.toLowerCase()}_${name}`;
};

export const NODE_CONFIGS: { [key in StaticNetworkIds]: RawNodeConfig[] } = {
  RSK: [
    {
      name: makeNodeName('RSK', 'rsk_mainnet'),
      type: 'rpc',
      service: 'public-node.rsk.co',
      url: 'https://public-node.rsk.co/'
    }
  ],

  RSK_TESTNET: [
    {
      name: makeNodeName('RSK_TESTNET', 'rsk_testnet'),
      type: 'rpc',
      service: 'public-node.testnet.rsk.co',
      url: 'https://public-node.testnet.rsk.co/'
    }
  ]
};

export default NODE_CONFIGS;
