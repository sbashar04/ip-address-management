import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuditLogService } from '../../services/audit-log.service';
import { Observable, Subscription, finalize } from 'rxjs';
import { IAuditLog } from '../../audit-log.models';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss']
})
export class LogViewerComponent implements OnInit, OnDestroy {

  logs$: Observable<IAuditLog>;
  subscriptions = new SubSink();
  auditLogSubscription = new Subscription();
  currentPageIndex = 1;
  isLoading = false;
  auditLogList: IAuditLog;
  errors: any;

  constructor(
    private auditLogService: AuditLogService,
    private storageService: StorageService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.subscriptions.sink = this.route.queryParams.subscribe(queryParams => {
      if(queryParams['page']){
        this.isLoading = true;

        if(this.storageService.ipAddress?.list && this.currentPageIndex === queryParams['page']) {
          this.logs$ = this.storageService.getAuditLogs();
        }else{
          this.currentPageIndex = queryParams['page'];
          this.storageService.setAuditLogs(null);
          this.storageService.setAuditSelectedPageIndex(null);
          this.logs$ = this.auditLogService.getLogs(this.currentPageIndex);
        }

        if(this.auditLogSubscription){
          this.auditLogSubscription.unsubscribe();
        }

        this.auditLogSubscription = this.logs$.pipe(finalize(() => this.isLoading = false)).subscribe({
          next: response => {
            this.auditLogList = response;
            this.storageService.setAuditLogs(this.auditLogList);
            this.storageService.setAuditSelectedPageIndex(this.currentPageIndex);
          },
          error: ({error}) => {
            this.errors = error?.errors;
          }
        });
      }else{
        this.isLoading = true;
        this.currentPageIndex = 1;
        if(this.storageService.auditLog?.list && this.currentPageIndex === this.storageService.auditLog.selectedPageIndex) {
          this.logs$ = this.storageService.getAuditLogs();
        }else{
          this.logs$ = this.auditLogService.getLogs(this.currentPageIndex);
        }

        if(this.auditLogSubscription){
          this.auditLogSubscription.unsubscribe();
        }

        this.auditLogSubscription = this.logs$.pipe(finalize(() => this.isLoading = false)).subscribe({
          next: response => {
            this.auditLogList = response;
            this.storageService.setAuditLogs(this.auditLogList);
            this.storageService.setAuditSelectedPageIndex(this.currentPageIndex);
          },
          error: ({error}) => {
            this.errors = error?.errors;
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.auditLogSubscription.unsubscribe();
  }

}
