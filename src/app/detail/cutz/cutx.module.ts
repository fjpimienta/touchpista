import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CutzCaptureComponent } from './cutz-capture/cutz-capture.component';

@NgModule({
    declarations: [
        CutzCaptureComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class CutzsModule { }
