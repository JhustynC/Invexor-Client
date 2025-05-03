import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'client',
    loadComponent: () =>
      import('./layout/invexor-layout/invexor-layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./feature/dashboard/components/grid-widgets/grid-layout.component'),
      },
    ],
  },
];
