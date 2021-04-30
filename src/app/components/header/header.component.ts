import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private auth: AuthenticationService,
               private wb3: Web3Service ) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
this.auth.logOut();
  }

  conectarMeta() {
  this.wb3.conectarMetamask();
  }

}
