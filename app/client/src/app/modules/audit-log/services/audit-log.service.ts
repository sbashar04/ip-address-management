import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/config/api-endpoints';
import { IAuditLog } from '../audit-log.models';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {

  constructor(
    private http: HttpClient,
  ) { }

  getLogs(page: number): Observable<IAuditLog> {
    return this.http.get<IAuditLog>(`${ApiEndpoints.LOGS}?page=${page}`);
  }
}
