import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  { path: 'auth',
  loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  { path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule),
    canActivate: [ AuthGuard ]
  },
 { path: '', redirectTo: 'auth', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
