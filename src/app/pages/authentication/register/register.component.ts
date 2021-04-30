import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  usuario;

 // tslint:disable-next-line:variable-name
  validation_messages = {
    password: [
        { type: 'minlength', message: 'El password debe tener minimo 8 caracteres.' },
      ],
    };

    public formSubmitted = false;

    public registerForm = this.fb.group({
      nombre: ['', Validators.required ],
      email: ['', [ Validators.required, Validators.email ] ],
      password: ['', Validators.required ],
      password2: ['', Validators.required ],
      terminos: [ true, Validators.required ],
    }, {
      validators: this.passwordsIguales('password', 'password2')
    });

  constructor(private fb: FormBuilder,
              private athentication: AuthenticationService,
              private router: Router, ) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {return; }
    Swal.fire({
    icon: 'info',
    text: 'Validando tus datos...'
    });

    Swal.showLoading();

    setTimeout( () => {
    // Realizar el posteo
    this.athentication.registro( this.registerForm.value ).subscribe( resp => {
      // Navegar al login
      Swal.fire({
        title: 'Listo!',
        text: 'Te envié un correo ( Serverless ) a través de un cloud function creado con Firebase + NodeMailer',
        showCancelButton: false,
        confirmButtonColor: '#3688fc',
        confirmButtonText: 'Continuar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Estás a un paso!',
            'puedes ingresar con tus datos',
            'success'
          );

          this.router.navigateByUrl('/auth/login');

        } else { }
      });

    }, (err) => {
    // Si sucede un error
    Swal.fire('Error', err.error.error.message, 'error' );
    });

     } , 1000  );




    }

  campoNoValido( campo: string ): boolean {
  if ( this.registerForm.get(campo).invalid && this.formSubmitted ) {
  return true;
  } else {
  return false;
  }
  }

  contrasenasNoValidas() {
  const pass1 = this.registerForm.get('password').value;
  const pass2 = this.registerForm.get('password2').value;
  if ( (pass1 !== pass2) && this.formSubmitted ) {
  return true;
  } else {
  return false;
  }
  }

  aceptaTerminos() {
  return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string ) {
  return ( formGroup: FormGroup ) => {
  const pass1Control = formGroup.get(pass1Name);
  const pass2Control = formGroup.get(pass2Name);
  if ( pass1Control.value === pass2Control.value ) {
  pass2Control.setErrors(null) ; } else {
  pass2Control.setErrors({ noEsIgual: true });
  }
  };
  }

}
