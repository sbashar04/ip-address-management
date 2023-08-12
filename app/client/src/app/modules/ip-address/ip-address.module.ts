import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpAddressListComponent } from './components/ip-address-list/ip-address-list.component';
import { IpAddressCreateComponent } from './components/ip-address-create/ip-address-create.component';
import { IpAddressEditComponent } from './components/ip-address-edit/ip-address-edit.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: IpAddressListComponent,
    title: 'IP Address List | IP Address Management',
  },
  {
    path: 'create',
    component: IpAddressCreateComponent,
    title: 'Create a new IP Address | IP Address Management',
  },
  {
    path: 'edit/:id',
    component: IpAddressEditComponent,
    title: 'Update IP Address | IP Address Management',
  }
];

@NgModule({
  declarations: [
    IpAddressListComponent,
    IpAddressCreateComponent,
    IpAddressEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class IpAddressModule { }
