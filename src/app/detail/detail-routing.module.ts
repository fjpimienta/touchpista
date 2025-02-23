import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail.component';
import { RentsComponent } from './rents/rents.component';
import { SalesComponent } from './sales/sales.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { RentCaptureComponent } from './rents/rent-capture/rent-capture.component';
import { SaleCaptureComponent } from './sales/sale-capture/sale-capture.component';
import { CutxCaptureComponent } from './cutx/cutx-capture/cutx-capture.component';
import { CutzCaptureComponent } from './cutz/cutz-capture/cutz-capture.component';

const routes: Routes = [
  { path: 'detail', component: DetailComponent },
  { path: 'rents', component: RentsComponent },
  { path: 'rentcapture', component: RentCaptureComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'salecapture', component: SaleCaptureComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'cutxcapture', component: CutxCaptureComponent },
  { path: 'cutzcapture', component: CutzCaptureComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule { }
