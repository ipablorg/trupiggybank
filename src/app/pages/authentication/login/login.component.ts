import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });


  constructor(private router: Router,
              private fb: FormBuilder,
              private athentication: AuthenticationService,
) { }

              ngOnInit(): void {

              }

              login() {

                this.athentication.login( this.loginForm.value )
                  .subscribe( resp => {

       if ( this.loginForm.get('remember').value ) {
                      localStorage.setItem('email', this.loginForm.get('email').value );
                    } else {
                      localStorage.removeItem('email');
                    }

                    // Navegar al Menu
       this.router.navigateByUrl('/menu');

                  }, (err) => {
                    // Si sucede un error
                    Swal.fire({
                      icon: 'error',
                      title: 'Error al autenticar',
                      text: err.error.error.message
                      });
                  });

              }




}
