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
  },
  {
    path: 'areas',
    component: AreasComponent,
  },
  {
    path: 'items',
    component: ItemsPageComponent,
  },
  {
    path: 'resources',
    component: ResourcesComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];

export default entitiesManagerRoutes;
