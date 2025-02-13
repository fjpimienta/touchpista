import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
import { SalesComponent } from './components/sales/sales.component';
import { RentsComponent } from './components/rents/rents.component';
import { ReportsComponent } from './components/reports/reports.component';
import { CutxComponent } from './components/cutx/cutx.component';
import { CutzComponent } from './components/cutz/cutz.component';
import { UsersComponent } from './components/users/users.component';

import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sales',
    component: SalesComponent
  },
  {
    path: 'rents',
    component: RentsComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'cutx',
    component: CutxComponent
  },
  {
    path: 'cutz',
    component: CutzComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
    HomeRoutingModule,
    DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
