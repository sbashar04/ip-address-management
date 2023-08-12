import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { SubSink } from 'subsink';
import { ILoginErrors } from '../../login.models';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

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

          // @TODO Toast for success

          this.router.navigate(['/']);
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
