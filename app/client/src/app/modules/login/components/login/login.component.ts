import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { SubSink } from 'subsink';
import { ILoginErrors } from '../../login.models';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  form: FormGroup;
  subscriptions = new SubSink();
  submitting = false;
  errors: ILoginErrors = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false],
    });

    if(this.authService.getToken() !== null) {
      this.router.navigate(['/']);
    }

  }

  handleLoginFormSubmission () {
    this.errors = null;
    this.submitting = true;

    if(this.form.valid) {
      this.subscriptions.sink = this.loginService.login(this.form.value)
      .pipe(finalize(() => this.submitting = false))
      .subscribe({
        next: response => {
          const responseUserProfile = response.data.user;
          const user: User = {
            name: responseUserProfile.name,
            email: responseUserProfile.email,
            email_verified_at: responseUserProfile.email_verified_at,
            id: responseUserProfile.id,
          }
          this.authService.authenticate(user, responseUserProfile.token);

          Swal.fire({
            title: 'Success!',
            text: 'Welcome Back! Login successful.',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });

          if(this.form.get('remember').value) {
            localStorage.setItem('remember', 'true');
          }

          this.form.reset();

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: ({error}) => {
          this.errors = error?.errors;
        }
      });
    }

  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
}
