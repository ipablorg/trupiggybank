import Web3 from 'web3';


const getWeb3 = () => {

    return new Promise((resolve, reject) => {

        window.addEventListener('load', function() {

            let web3 = window.web3;

            if (typeof web3 !== undefined) {
                web3 = new Web3(web3.currentProvider);
                resolve(web3);
            } else {
                console.error("No se encontro Povider, por favor instalar metamask");
                reject(); 
            }

        });

    });

}


export default getWeb3;