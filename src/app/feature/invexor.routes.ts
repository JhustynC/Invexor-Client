import { Routes } from '@angular/router';
import GridLayoutComponent from './dashboard/pages/grid-widgets/grid-widgets.component';
import ReportsComponent from './reports/pages/reports.component';
import MashupComponent from './mashup/pages/invexor-flow-graph/mashup.component';
import { ProfileComponent } from './profile/pages/profile.component';

export const featureRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: GridLayoutComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'entities-manager',
    loadChildren: () => import('./entities-manager/entities-manager.routes'),
  },
  {
    path: 'mashup',
    component: MashupComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

export default featureRoutes;
