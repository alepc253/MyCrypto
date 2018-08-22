const main: IEnsAddresses = require('./main.json');
const rinkeby: IEnsAddresses = require('./rinkeby.json');
const ropsten: IEnsAddresses = require('./ropsten.json');
const rskTestnet: IEnsAddresses = require('./rsk_testnet.json');

interface IEnsAddresses {
  public: {
    resolver: string;
    reverse: string;
    ethAuction: string;
  };

  registry: string;
}

export default { main, rinkeby, ropsten, rskTestnet };
