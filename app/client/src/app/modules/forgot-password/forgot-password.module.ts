import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordFormComponent } from './components/forgot-password-form/forgot-password-form.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordFormComponent,
    title: 'Forgot Password | IP Address Management',
  },
];

@NgModule({
  declarations: [
    ForgotPasswordFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ForgotPasswordModule { }
