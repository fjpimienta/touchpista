import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SaleCaptureComponent } from './sale-capture/sale-capture.component';

@NgModule({
  declarations: [
    SaleCaptureComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SalesModule { }
