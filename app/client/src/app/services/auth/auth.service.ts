import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authenticate(user: User, token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getUser(): User | null {
    if(localStorage.getItem('token') && localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user')) as User;
    }
    return null;
  }

  getToken(): string | null {
    if(localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

}
