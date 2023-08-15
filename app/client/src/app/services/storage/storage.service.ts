import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAuditLog } from 'src/app/modules/audit-log/audit-log.models';
import { IIpAddressList, ISingleIp } from 'src/app/modules/ip-address/ip-address.models';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  auditLog: AuditLogStore = {
    list: null,
    selectedPageIndex: null,
  };

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
    this.auditLog.list = auditLogs;
  }

  getAuditLogs(): Observable<IAuditLog> {
    return of(this.auditLog.list);
  }

  setAuditSelectedPageIndex (index: number) {
    this.auditLog.selectedPageIndex = index;
  }

  getAuditLogSelectedPageIndex(): number | null {
    return this.auditLog.selectedPageIndex;
  }

}

interface IpAddressStore {
  list: IIpAddressList,
  selectedIp: ISingleIp,
  selectedPageIndex: number,
}

interface AuditLogStore {
  list: IAuditLog,
  selectedPageIndex: number,
}
