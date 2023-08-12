import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from 'src/app/components/form-error/form-error.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login | IP Address Management',
  },
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormErrorComponent,
  ]
})
export class LoginModule { }
