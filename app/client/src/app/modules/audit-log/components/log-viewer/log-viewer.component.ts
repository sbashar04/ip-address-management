import { Component, OnInit } from '@angular/core';
import { AuditLogService } from '../../services/audit-log.service';
import { Observable } from 'rxjs';
import { IAuditLog } from '../../audit-log.models';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss']
})
export class LogViewerComponent implements OnInit {

  logs$: Observable<IAuditLog>;

  constructor(
    private auditLogService: AuditLogService,
  ) {

  }

  ngOnInit(): void {
    this.logs$ = this.auditLogService.getLogs();
  }

}
