export const RSK_TESTNET: DPath = {
  label: 'Testnet (RSK)',
  value: "m/44'/37310'/0'/0"
};

export const RSK_MAINNET: DPath = {
  label: 'Mainnet (RSK)',
  value: "m/44'/137'/0'/0"
};

export const DPaths: DPath[] = [RSK_MAINNET, RSK_TESTNET];

// PATHS TO BE INCLUDED REGARDLESS OF WALLET FORMAT
export const EXTRA_PATHS = [RSK_MAINNET];

// Full length deterministic wallet paths from BIP44
// https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
// normal path length is 4, ledger is the exception at 3

// m / purpose' / coin_type' / account' / change / address_index
//   |          |            |          |        |
//   | constant |   index    |  index   | 0 or 1 |
//   |__________|____________|__________|________|

// whitespace strings are evaluated the same way as nospace strings, except they allow optional spaces between each portion of the string
// ie. "m / 44' / 0' / 0'" is valid, "m / 4 4' / 0' / 0'" is invalid
export const dPathRegex = /m\/4[4,9]'\/[0-9]+\'\/[0-9]+(\'+$|\'+(\/[0-1]+$))/;
// export const whitespaceDPathRegex = /m\s*\/\s*44'\s*\/\s*[0-9]+\'\s*\/\s*[0-9]+(\'+$|\'+\s*(\/\s*[0-1]+$))/;
