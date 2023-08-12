import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IpAddressService } from '../../services/ip-address.service';
import { finalize } from 'rxjs';
import { IIPError } from '../../ip-address.models';

@Component({
  selector: 'app-ip-address-create',
  templateUrl: './ip-address-create.component.html',
  styleUrls: ['./ip-address-create.component.scss']
})
export class IpAddressCreateComponent {

  form: FormGroup;
  submitting = false;
  errors: IIPError = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ipAddressService: IpAddressService,
  ) {
    const ipPattern =
    "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    this.form = this.fb.group({
      ip_address: ['192.168.0.1', [Validators.required, Validators.pattern(ipPattern)]],
      label: ['', [Validators.required]],
    })
  }

  goToNewIpList() {
    this.router.navigate(['ip-addresses']);
  }

  handleSubmit() {
    this.errors = null;
    this.submitting = true;
    if(this.form.valid) {
      this.ipAddressService.createIp(this.form.value)
      .pipe(finalize(() => this.submitting = false))
      .subscribe({
        next: response => {
          // @TODO Toast for success
          sessionStorage.setItem('ip_address', JSON.stringify(response.data.ip_address));
          this.router.navigate(['/ip-addresses']);
        },
        error: ({error}) => {
          this.errors = error?.errors;
        }
      });
    }
  }

}
