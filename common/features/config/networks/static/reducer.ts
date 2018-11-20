import { InsecureWalletName, SecureWalletName } from 'config/data';
import { RSK_MAINNET, RSK_TESTNET } from 'config/dpaths';
import { makeExplorer } from 'utils/helpers';
import { StaticNetworksState } from './types';

export const STATIC_NETWORKS_INITIAL_STATE: StaticNetworksState = {
  RSK: {
    id: 'RSK',
    name: 'RSK',
    unit: 'RBTC',
    chainId: 30,
    color: '#58A052',
    isCustom: false,
    blockExplorer: makeExplorer({
      name: 'RSK Explorer',
      origin: 'https://explorer.rsk.co'
    }),
    tokens: require('config/tokens/rsk.json'),
    contracts: require('config/contracts/rsk.json'),
    isTestnet: false,
    dPathFormats: {
      [SecureWalletName.TREZOR]: RSK_MAINNET,
      [SecureWalletName.LEDGER_NANO_S]: RSK_MAINNET,
      [InsecureWalletName.MNEMONIC_PHRASE]: RSK_MAINNET
    },
    gasPriceSettings: {
      min: 0.183,
      max: 1.5,
      initial: 0.183
    }
  },

  RSK_TESTNET: {
    id: 'RSK_TESTNET',
    name: 'RSK',
    unit: 'RBTC',
    chainId: 31,
    color: '#58A052',
    isCustom: false,
    blockExplorer: makeExplorer({
      name: 'RSK Testnet Explorer',
      origin: 'https://explorer.testnet.rsk.co'
    }),
    tokens: require('config/tokens/rsk_testnet.json'),
    contracts: require('config/contracts/rsk_testnet.json'),
    isTestnet: true,
    dPathFormats: {
      [SecureWalletName.TREZOR]: RSK_TESTNET,
      [SecureWalletName.LEDGER_NANO_S]: RSK_TESTNET,
      [InsecureWalletName.MNEMONIC_PHRASE]: RSK_TESTNET
    },
    gasPriceSettings: {
      min: 0.183,
      max: 1.5,
      initial: 0.183
    }
  }
};

export function staticNetworksReducer(
  state: StaticNetworksState = STATIC_NETWORKS_INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    default:
      return state;
  }
}
