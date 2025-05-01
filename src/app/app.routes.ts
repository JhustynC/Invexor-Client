import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'client',
    loadComponent: () =>
      import('./layout/invexor-layout/invexor-layout.component'),
    children: [],
  },
];
