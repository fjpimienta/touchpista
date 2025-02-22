import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = 'test@example.com';
  password: string = 'password123';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/home']).then(() => {
        window.location.reload(); // Recarga para que el menú aparezca correctamente
      });
    } else {
      alert('Invalid credentials');
    }
  }
}
