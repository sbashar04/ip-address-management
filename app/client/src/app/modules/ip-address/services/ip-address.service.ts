import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoints } from 'src/app/config/api-endpoints';
import { IIPRequest, IIPResponse, IIpAddressList } from '../ip-address.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpAddressService {

  constructor(
    private http: HttpClient,
  ) { }

  getIpAddresses(pageIndex: number): Observable<IIpAddressList> {
    return this.http.get<IIpAddressList>(`${ApiEndpoints.IP_ADDRESS}?page=${pageIndex}`);
  }

  createIp(model: IIPRequest): Observable<IIPResponse> {
    return this.http.post<IIPResponse>(ApiEndpoints.IP_ADDRESS, model);
  }

  getSingleIp(id: number): Observable<any> {
    return this.http.get<any>(`${ApiEndpoints.IP_ADDRESS}/${id}`);
  }

  updateIp(model: IIPRequest, id: number): Observable<IIPResponse> {
    return this.http.patch<IIPResponse>(`${ApiEndpoints.IP_ADDRESS}/${id}`, model);
  }

}
