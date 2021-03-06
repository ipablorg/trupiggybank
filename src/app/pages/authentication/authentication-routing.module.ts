import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {  path: '',
  component: AuthenticationComponent, children: [
   {
     path: 'login',
     component: LoginComponent,
   },
   {
     path: 'register',
     component: RegisterComponent,
   },
   { path: '',
   redirectTo: 'register',
   pathMatch: 'full' }

 ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
