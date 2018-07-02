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
      service: 'mycrypto.rsk.co',
      url: 'https://mycrypto.rsk.co/'
    }
  ],

  RSK_TESTNET: [
    {
      name: makeNodeName('RSK_TESTNET', 'rsk_testnet'),
      type: 'rpc',
      service: 'mycrypto.testnet.rsk.co',
      url: 'https://mycrypto.testnet.rsk.co/'
    }
  ]
};

export default NODE_CONFIGS;
