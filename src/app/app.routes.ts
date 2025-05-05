import { Routes } from '@angular/router';
import InvexorLayoutComponent from './layout/invexor-layout/invexor-layout.component';

export const routes: Routes = [
  {
    path: 'client',
    component: InvexorLayoutComponent,
    loadChildren:() => import('./feature/invexor.routes'),
  },
  {
    path: 'auth',
    redirectTo: 'client',
    pathMatch: 'full'
  },
  // {
  //   path: '**',
  //   redirectTo: 'client',
  // }
];
