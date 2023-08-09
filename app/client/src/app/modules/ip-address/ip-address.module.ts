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
  },
  {
    path: 'create',
    component: IpAddressCreateComponent,
  },
  {
    path: 'edit/:id',
    component: IpAddressEditComponent,
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
