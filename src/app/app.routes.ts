import { Routes } from '@angular/router';
import InvexorLayoutComponent from './layout/invexor-layout/invexor-layout.component';
import LoginComponent from './feature/auth/pages/login/login.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'client',
    component: InvexorLayoutComponent,
    loadChildren: () => import('./feature/invexor.routes'),
    canActivate: [authGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
