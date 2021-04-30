import { Injectable } from '@angular/core';
import getWeb3 from './getWeb3';
import ethEnabled from './connectMeta';
import PiggyBankTru from './contracts/piggyBankTru';

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  web3;
  contrato;

  // Datos de nuemro de cuenta Metamask y balance
  cuentaMetaMask;
  balanceCuenta;
  conectarMeta;

  // Balance de la alcancia
  alcancia;

  constructor() {
this.getBalance();
   }


  async getContrato() {
  this.web3 = await getWeb3();
  this.contrato = await PiggyBankTru( this.web3.currentProvider );
  console.log( this.contrato );
  }

async conectarMetamask() {
this.conectarMeta = await ethEnabled();
}

  async getBalance() {

    this.web3 = await getWeb3();
    this.cuentaMetaMask = (await this.web3.eth.getAccounts())[0];
    this.cuentaMetaMask = this.cuentaMetaMask.toLowerCase();
    this.balanceCuenta = await this.web3.eth.getBalance(this.cuentaMetaMask);
    this.balanceCuenta =  this.web3.utils.fromWei( this.balanceCuenta , 'ether'  ) ;
    this.balanceCuenta = Number(this.balanceCuenta.slice(0, 7));
    console.log( 'Cuenta Metamask:', this.cuentaMetaMask , 'balance: ' ,  this.balanceCuenta  );

}


  async hacerDeposito( valor ) {
  const weis = this.web3.utils.toWei(valor , 'ether');
  console.log(weis);
  return this.contrato.depositAmount( weis , { from: this.cuentaMetaMask, value: weis } );
  }

  async retirarFondos(valor, from) {
  const weis = this.web3.utils.toWei(valor , 'ether');
  console.log(weis);
  return this.contrato.withdraw( weis , { from , gas : 5000000 } );
  }

  async traerAlcancias() {
  this.web3 = await getWeb3();
  this.contrato = await PiggyBankTru( this.web3.currentProvider );
  const alcancia = (await this.contrato.getAlcancia(this.cuentaMetaMask));
  this.alcancia = this.web3.utils.fromWei( alcancia , 'ether') || 0;
  console.log( 'Alcancia' , alcancia.toString() );
  }

  async balanceContrato() {
  const balance = await this.contrato.getBalance();
  console.log( 'Balance del contrato' , balance.toString());
  }




}
