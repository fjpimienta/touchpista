import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentsComponent } from './rents/rents.component';
import { SalesComponent } from './sales/sales.component';
import { ReportsComponent } from './reports/reports.component';
import { CutxComponent } from './cutx/cutx.component';
import { CutzComponent } from './cutz/cutz.component';
import { UsersComponent } from './users/users.component';
import { DetailRoutingModule } from './detail-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail.component';

@NgModule({
  declarations: [
    RentsComponent,
    SalesComponent,
    ReportsComponent,
    CutxComponent,
    CutzComponent,
    UsersComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DetailRoutingModule
  ],
  exports: [
    RentsComponent,
    SalesComponent,
    ReportsComponent,
    CutxComponent,
    CutzComponent,
    UsersComponent
  ]
})
export class DetailModule { }
