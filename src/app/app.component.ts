import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    this.translate.setDefaultLang('es');
    console.log('APP_CONFIG', APP_CONFIG);
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
