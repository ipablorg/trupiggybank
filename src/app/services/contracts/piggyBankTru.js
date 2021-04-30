import PiggyBankTru from "../../../../../blockchain/build/contracts/PiggyBankTru.json";
let contract = require("@truffle/contract");

export default async(provider) => {

    const contrato = contract(PiggyBankTru);
    contrato.setProvider(provider);

    let instace = await contrato.deployed();
    return instace;


}