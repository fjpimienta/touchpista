import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  isLoggedIn = false;
  showNavigation = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavigation = this.isAuthenticated() && event.url !== '/login';
      }
    });
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
