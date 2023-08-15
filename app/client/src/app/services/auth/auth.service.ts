import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/config/api-endpoints';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  authenticate(user: User, token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): Observable<any> {
    return this.http.post<any>(ApiEndpoints.LOGOUT, {});
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
