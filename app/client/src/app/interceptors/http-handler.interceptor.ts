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

@Injectable()
export class HttpHandlerInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Retrieving the token
    const token = '';
    console.log(request.url);
    request = request.clone({url: `${environment.apiUrl}${request.url}`});
    request.headers.set('Content-Type', 'application/json');
    // request.headers.set('Authorization', `Bearer ${token}`);

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              alert('unauthenticated');
              this.router.navigate(['login']);

              // @TODO Add toast service
            }
          }
          return event;
        },
        error: (error) => {
          if(error.status === 401) {
            alert('unauthenticated');
            this.router.navigate(['login']);
            // @TODO Add toast service
          } else if(error.status === 404) {
            alert('Page Not Found!')
          }
        }
      })
    );

    // .pipe(
    //   catchError((requestError: any): any => {
    //     if (requestError.status !== 401) {
    //       this.router.navigate(['login']);
    //       // @TODO Add toast service
    //     }
    //   })
    // );
  }
}
