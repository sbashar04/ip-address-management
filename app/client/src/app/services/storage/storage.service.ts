import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAuditLog } from 'src/app/modules/audit-log/audit-log.models';
import { IIpAddressList, ISingleIp } from 'src/app/modules/ip-address/ip-address.models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  ipAddresses: IIpAddressList;
  auditLogs: IAuditLog;
  selectedIpAddress: ISingleIp;
  isIpAddressUpdated = false;
  isIpAddressCreated = false;

  constructor() { }

  setIpAddresses (ipAddresses: IIpAddressList) {
    this.ipAddresses = ipAddresses;
  }

  getIpAddresses(): Observable<IIpAddressList> {
    return of(this.ipAddresses);
  }

  setAuditLogs (auditLogs: IAuditLog) {
    this.auditLogs = auditLogs;
  }

  getAuditLogs(): Observable<IAuditLog> {
    return of(this.auditLogs);
  }

  setSelectedIpAddress (selectedIpAddress: ISingleIp) {
    this.selectedIpAddress = selectedIpAddress;
  }

  getSelectedIpAddress(): Observable<ISingleIp> | null {
    return of(this.selectedIpAddress);
  }

}
