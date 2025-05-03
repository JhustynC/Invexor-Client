import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/components/grid-layout.component'),
  },
];
