import { Routes } from '@angular/router';
import GridLayoutComponent from './dashboard/pages/grid-widgets/grid-widgets.component';
import ReportsComponent from './reports/pages/reports.component';
import MashupComponent from './mashup/pages/invexor-flow-graph/mashup.component';
import { ProfileComponent } from './profile/pages/profile.component';

export const featureRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    data: { breadcrumb: 'Dashboard' },
  },
  {
    path: 'dashboard',
    component: GridLayoutComponent,
    data: { breadcrumb: 'Dashboard' },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: { breadcrumb: 'Reports' },
  },
  {
    path: 'entities-manager',
    loadChildren: () => import('./entities-manager/entities-manager.routes'),
    data: { breadcrumb: 'Entities-Manager' },
  },
  {
    path: 'mashup',
    component: MashupComponent,
    data: { breadcrumb: 'Mashup' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { breadcrumb: 'Profile' },
  },
];

export default featureRoutes;
