import { Routes } from '@angular/router';
import InvexorLayoutComponent from './layout/invexor-layout/invexor-layout.component';
import LoginComponent from './feature/auth/pages/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
    
  },
  {
    path: 'client',
    component: InvexorLayoutComponent,
    loadChildren:() => import('./feature/invexor.routes'),
  },
  // {
  //   path: '**',
  //   redirectTo: 'client',
  // }
];
