import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { UsuarioModel } from '../models/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

      // Claves para registro con email
      private url = 'https://identitytoolkit.googleapis.com/v1';
      // Este apiKey esta en descripcion general ( clicl en nombre del app ) configuracion-general APIweb
      private apiKey = 'AIzaSyCU5nZfrhu-3_4fPqLI8amelefjyEELf4E';


      userToken: string;
      usuarioUid;
      usuario = [];

  constructor(private http: HttpClient ,
              public afAuth: AngularFireAuth ,
              private db: AngularFirestore,
             ) {
this.leerToken();
this.afAuth.authState.subscribe(user => { console.log( 'estado del usuario' , user ); if ( !user ) { return; } });
this.usuarioUid = localStorage.getItem('uid');
console.log( this.usuarioUid );
               }


enviarCorreo( usuario: UsuarioModel) { return this.http.post(`${environment.url}/api/mail` , usuario  ).subscribe(
  resp => console.log( 'usuario:', usuario , 'respuesta' , resp) );
                }


               login( usuario: UsuarioModel) {
                const authData = {
                ...usuario,
                returnSecureToken : true
                };
                return this.http.post( `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`, authData ).pipe(
                map((resp: any) => {
                console.log( 'entro en el pipe del RXJS' , resp );
                this.guardarToken( resp.idToken);
                localStorage.setItem( 'uid' , resp.localId );
                return resp;
                } )); }

                registro( usuario ) {
                  const nombre = usuario.nombre;
                  const email = usuario.email;
                  const password = usuario.password;
                  const mailData = { nombre,  email };
                  const authData = { email,  password,  returnSecureToken : true  };
                  return this.http.post( `${this.url}/accounts:signUp?key=${this.apiKey}`, authData ).pipe(
                  map( (resp: any) => { this.guardarToken( resp.idToken);
                                        this.enviarCorreo( mailData );
                                        this.crearUsuarioDB( usuario , resp.localId );
                                        localStorage.setItem( 'uid' , resp.localId );
                                        return resp;
                                  }));
                                  }

                                  crearUsuarioDB( usuario, id ) {
console.log('creandoUsuario');
                                  }

                                  private guardarToken( idToken: string ) {
                                    this.userToken = idToken;
                                    localStorage.setItem( 'token' , idToken );
                                    // Para validar la expiracion del token
                                    const horaActual = new Date();
                                    // le sumamos una hora
                                    horaActual.setSeconds( 3600 );
                                    // Lo enviamos al localStorage como string
                                    localStorage.setItem( 'expira' , horaActual.getTime().toString() );
                  }

                  estaLogueado(): boolean {
                    if ( this.userToken.length < 2 ) { return false ; }
                    // continuacion linea 80, traemos el dato de la expiracion como numero
                    const datoExpiracion = Number( localStorage.getItem('expira') );
                    // Para volver este numero date nuevamente=
                    const expiraDate = new Date();
                    expiraDate.setTime( datoExpiracion );
                    // Ahora solo comparamos las horas, si el datoExpiracion es mayor a la hora actual
                    // Seguiria logueado pues le queda tiempo, retorna true
                    if ( expiraDate > new Date() ) { return true ; } else { return false; }
                  }

                  leerToken() {
                      if ( localStorage.getItem('token') ) {
                      this.userToken = localStorage.getItem('token');
                      } else { this.userToken = ''; }
                      return this.userToken;
                  }

                  logOut() {
                    return localStorage.removeItem( 'token' ),
                    localStorage.removeItem( 'expira' ),
                    localStorage.removeItem( 'uid' );
                    }
}
