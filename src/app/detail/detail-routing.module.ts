import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail.component';
import { RentsComponent } from './rents/rents.component';
import { SalesComponent } from './sales/sales.component';
import { ReportsComponent } from './reports/reports.component';
import { CutxComponent } from './cutx/cutx.component';
import { CutzComponent } from './cutz/cutz.component';
import { UsersComponent } from './users/users.component';
import { RentCaptureComponent } from './rents/rent-capture/rent-capture.component';

const routes: Routes = [
  { path: 'detail', component: DetailComponent },
  { path: 'rents', component: RentsComponent },
  { path: 'rentcapture', component: RentCaptureComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'cutx', component: CutxComponent },
  { path: 'cutz', component: CutzComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule { }
