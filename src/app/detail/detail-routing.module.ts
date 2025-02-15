import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail.component';
import { SalesComponent } from './sales/sales.component';
import { RentsComponent } from './rents/rents.component';
import { ReportsComponent } from './reports/reports.component';
import { CutxComponent } from './cutx/cutx.component';
import { CutzComponent } from './cutz/cutz.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'detail',
    component: DetailComponent
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
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule {}
