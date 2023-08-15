import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogViewerComponent } from './components/log-viewer/log-viewer.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';

const routes: Routes = [
  {
    path: '',
    component: LogViewerComponent,
    title: 'Audit Log | IP Address Management',
  },
];

@NgModule({
  declarations: [
    LogViewerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PaginationComponent,
  ]
})
export class AuditLogModule { }
