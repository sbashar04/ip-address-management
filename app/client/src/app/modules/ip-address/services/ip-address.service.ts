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

  getIpAddresses(): Observable<IIpAddressList> {
    return this.http.get<IIpAddressList>(ApiEndpoints.IP_ADDRESS_LIST);
  }

  createIp(model: IIPRequest): Observable<IIPResponse> {
    return this.http.post<IIPResponse>(ApiEndpoints.CREATE_IP, model);
  }

}
