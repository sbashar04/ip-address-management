import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuditLogService } from '../../services/audit-log.service';
import { Observable } from 'rxjs';
import { IAuditLog } from '../../audit-log.models';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss']
})
export class LogViewerComponent implements OnInit, OnDestroy {

  logs$: Observable<IAuditLog>;
  subscription = new SubSink();

  constructor(
    private auditLogService: AuditLogService,
    private storageService: StorageService,
  ) {

  }

  ngOnInit(): void {
    if(this.storageService.auditLogs) {
      this.logs$ = this.storageService.getAuditLogs();
    }else{
      this.logs$ = this.auditLogService.getLogs();
    }

    this.subscription.sink = this.logs$.subscribe(logs => {
      if(logs) {
        this.storageService.setAuditLogs(logs);
      }
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
