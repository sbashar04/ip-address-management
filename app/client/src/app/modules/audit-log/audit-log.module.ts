import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogViewerComponent } from './components/log-viewer/log-viewer.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LogViewerComponent,
  },
];

@NgModule({
  declarations: [
    LogViewerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AuditLogModule { }
