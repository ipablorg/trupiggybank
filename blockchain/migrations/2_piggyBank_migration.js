const PiggyBankTru = artifacts.require("./PiggyBankTru.sol");

module.exports = function(deployer) {
    deployer.deploy(PiggyBankTru);
};