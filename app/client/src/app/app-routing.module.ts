import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/audit-log/audit-log.module').then(m => m.AuditLogModule)
  },
  {
    path: 'ip-addresses',
    loadChildren: () => import('./modules/ip-address/ip-address.module').then(m => m.IpAddressModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
