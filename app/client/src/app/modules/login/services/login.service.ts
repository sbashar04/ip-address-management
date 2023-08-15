import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginRequest, ILoginResponse } from '../login.models';
import { ApiEndpoints } from 'src/app/config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) { }

  login(model: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(ApiEndpoints.LOGIN, model);
  }

}
