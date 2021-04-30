var PiggyBankTru = artifacts.require("PiggyBankTru");

var instance;


beforeEach(async() => {
    // Desplegar un SC cada vez que se ejecute un test: , en instance quedan almacenadas las funciones del SC para testearlas
    instance = await PiggyBankTru.new();

});


contract('PiggyBank Contract', (accounts) => {



    it('Should allow the owner to deposit ether', async() => {
        const one_ether = web3.toWei("1", "ether");
        await instance.depositAmount(one_ether, { from: accounts[1], value: one_ether });

        let b = await instance.getBalance();
        console.log('ContractBalanceTest ', instance.address, b.toString());
        assert.equal(b.toString(), "1000000000000000000", "the contract's balance should be 1 ether");


    });

    it('Should allow the owner to withdraw ether', async() => {

        const one_ether = web3.toWei("1", "ether");
        await instance.deposit({ from: accounts[1], value: one_ether });


        const half_ether = web3.toWei("0.5", "ether");
        await instance.withdraw(half_ether);

        let b = await instance.getBalance();
        console.log('ContractBalanceTest withdraw', instance.address, b.toString());
        assert.equal(b.toString(), "500000000000000000", "the contract's balance should be 0.5 ether");


    });





})