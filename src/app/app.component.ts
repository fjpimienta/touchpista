import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isLoggedIn = false;
  showNavigation = false;

  constructor(private authService: AuthService, private router: Router, public translate: TranslateService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavigation = this.isAuthenticated() && event.url !== '/login';
      }
    });

    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');

    const browserLang = translate.getBrowserLang() || 'es';
    translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
  }

  ngOnInit() {
    if (window.location.pathname === '/') {
      this.router.navigate(['/login']);
    }
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Fuerza la redirección si no está autenticado
    } else {
      this.isLoggedIn = true;
    }
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
