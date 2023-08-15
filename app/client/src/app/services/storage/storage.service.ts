import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAuditLog } from 'src/app/modules/audit-log/audit-log.models';
import { IIpAddressList, ISingleIp } from 'src/app/modules/ip-address/ip-address.models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  auditLogs: IAuditLog;

  ipAddress: IpAddressStore = {
    list: null,
    selectedIp: null,
    selectedPageIndex: 1,
  };
  // ipAddresses: IIpAddressList;
  // selectedIpAddress: ISingleIp;

  constructor() { }

  setIpAddresses (ipAddresses: IIpAddressList) {
    this.ipAddress.list = ipAddresses;
  }

  getIpAddresses(): Observable<IIpAddressList> {
    return of(this.ipAddress.list);
  }

  setSelectedIpAddress (selectedIpAddress: ISingleIp) {
    this.ipAddress.selectedIp = selectedIpAddress;
  }

  getSelectedIpAddress(): Observable<ISingleIp> | null {
    return of(this.ipAddress.selectedIp);
  }

  setSelectedPageIndex (index: number) {
    this.ipAddress.selectedPageIndex = index;
  }

  getSelectedPageIndex(): number {
    return this.ipAddress.selectedPageIndex;
  }

  /**
   * Audit Logs
   */
  setAuditLogs (auditLogs: IAuditLog) {
    this.auditLogs = auditLogs;
  }

  getAuditLogs(): Observable<IAuditLog> {
    return of(this.auditLogs);
  }

}

interface IpAddressStore {
  list: IIpAddressList,
  selectedIp: ISingleIp,
  selectedPageIndex: number,
}
