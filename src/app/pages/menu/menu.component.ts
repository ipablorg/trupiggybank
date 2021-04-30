import { AfterContentInit, Component, DoCheck, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Web3Service } from '../../services/web3.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit , AfterContentInit {
  web3;
  valorAdepositar = 0;
  depositarEther = true;
  retirarEther = false;
  cuenta;

  constructor( public web3Service: Web3Service, private router: Router ) {
    this.cuenta = this.web3Service.cuentaMetaMask;

  }

  ngOnInit(): void {


  }

  ngAfterContentInit() {
    this.web3Service.traerAlcancias().then(
      res => console.log(res)
      );
    this.web3Service.getBalance();
    this.web3Service.getContrato().then(
      () => { this.web3Service.balanceContrato(); }
      );
  }


  async depositar( formulario: NgForm ) {
  const monto = formulario.value.valorAdepositar.toString();
  await this.web3Service.hacerDeposito(monto).then(
  () => {
    Swal.fire(
      'Transferencia exitosa!',
      'gracias por preferirnos',
      'success'
    ).then( () => window.location.reload());
  }
  );

  }

  async retirar( formulario: NgForm ) {
  const monto = formulario.value.valorAretirar.toString();
  await this.web3Service.retirarFondos( monto,
                                        this.web3Service.cuentaMetaMask
                                        ).then(
                                          () => {
                                            Swal.fire(
                                              'Retiro exitoso!',
                                              'gracias por preferirnos',
                                              'success'
                                            ).then( () => window.location.reload());
                                          }
                                          );
   }


   continuar() {
    this.router.navigateByUrl('/confirmation');
   }



  depositarClick() {
this.depositarEther = true;
this.retirarEther = false;
  }
  retirarClick() {
 this.retirarEther = true;
 this.depositarEther = false;
  }

}
