import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CutxCaptureComponent } from './cutx-capture/cutx-capture.component';

@NgModule({
    declarations: [
        CutxCaptureComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class CutxsModule { }
