import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ElectronService } from './providers/electron.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RentsModule } from './detail/rents/rents.module';
import { SalesModule } from './detail/sales/sales.module';
import { CutxsModule } from './detail/cutx/cutx.module';
import { CutzsModule } from './detail/cutz/cutx.module';
import { StudentsComponent } from './detail/students/students.component';
import { TeachersComponent } from './detail/teachers/teachers.component';
import { MaterialModule } from './shared/material.module';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        LoginComponent,
        StudentsComponent,
        TeachersComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        SharedModule,
        HomeModule,
        DetailModule,
        AppRoutingModule,
        HomeRoutingModule,
        DetailRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        RentsModule,
        SalesModule,
        CutxsModule,
        CutzsModule,
        MaterialModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        ElectronService,
        AuthService,
        AuthGuard
    ]
})
export class AppModule { 
    constructor(private translate: TranslateService) {
        this.translate.setDefaultLang('es');
    }
}
