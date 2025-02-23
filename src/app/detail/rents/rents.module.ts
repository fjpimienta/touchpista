import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RentCaptureComponent } from './rent-capture/rent-capture.component';

@NgModule({
  declarations: [
    RentCaptureComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RentsModule { }
