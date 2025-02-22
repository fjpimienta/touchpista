import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email === 'test@example.com' && password === 'password123') {
      localStorage.setItem('token', 'user-token'); // Simula autenticación
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Retorna true si hay un token
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }
}
