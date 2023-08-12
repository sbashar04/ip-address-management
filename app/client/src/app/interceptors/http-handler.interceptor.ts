import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { endpointsWithoutAuth } from '../config/constants';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class HttpHandlerInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Retrieving the token
    const token = this.authService.getToken();

    let headers = {}

    headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
    }

    // Ignoring authorization for some endpoints
    if(!endpointsWithoutAuth.includes(request.url)){
      headers = {
        ...headers,
        'Authorization': `Bearer ${token}`,
      }
    }

    request = request.clone({
      url: `${environment.apiUrl}${request.url}`,
      setHeaders: headers
    });

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              // this.authService.logout();
              // this.router.navigate(['login']);

              // @TODO Add toast service
            }
          }
          return event;
        },
        error: (error) => {
          if(error.status === 401) {
            this.authService.logout();
            this.router.navigate(['login']);
            // @TODO Add toast service
          } else if(error.status === 404) {
            alert('Page Not Found!')
          }
        }
      })
    );
  }
}
