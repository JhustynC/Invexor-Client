import { Routes } from '@angular/router';
import BranchsComponent from './pages/branchs/branchs.component';
import AreasComponent from './pages/areas/areas.component';
import ResourcesComponent from './pages/resources/resources.component';
import UsersComponent from './pages/users/users.component';
import ItemsPageComponent from './pages/items/pages/items-page/items-page.component';

export const entitiesManagerRoutes: Routes = [
  {
    path: 'branchs',
    component: BranchsComponent,
    data: { breadcrumb: 'Branchs' },
  },
  {
    path: 'areas',
    component: AreasComponent,
    data: { breadcrumb: 'Areas' },
  },
  {
    path: 'items',
    component: ItemsPageComponent,
    data: { breadcrumb: 'Items' },
  },
  {
    path: 'resources',
    component: ResourcesComponent,
    data: { breadcrumb: 'Resources' },
  },
  {
    path: 'users',
    component: UsersComponent,
    data: { breadcrumb: 'Users' },
  },
  {
    path: '**',
    redirectTo: 'branchs',
  },
];

export default entitiesManagerRoutes;
