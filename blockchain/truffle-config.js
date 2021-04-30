var HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'already bless mutual car iron reject exit baby fly gun spawn sail';

module.exports = {
    networks: {
        development: {
            host: 'localhost',
            port: 7545,
            network_id: '*',
            gas: 5000000
        },
        rinkeby: {
            provider: function() {
                return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/bd5ce55997e84c6e98d56d5fc605c782");
            },
            network_id: 4,
            gas: 4500000,
            gasPrice: 10000000000,
        }
    }
}