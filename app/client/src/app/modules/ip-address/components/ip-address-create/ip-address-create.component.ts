import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IpAddressService } from '../../services/ip-address.service';
import { finalize } from 'rxjs';
import { IIPError } from '../../ip-address.models';
import { StorageService } from 'src/app/services/storage/storage.service';
import Swal from 'sweetalert2'

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
    private storageService: StorageService,
  ) {
    const ipPattern =
    "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    this.form = this.fb.group({
      ip_address: ['', [Validators.required, Validators.pattern(ipPattern)]],
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
          Swal.fire({
            title: 'Success!',
            text: 'IP Address has been created successfully.',
            icon: 'success',
            confirmButtonText: 'OKAY'
          }).then(() => {
            const pageIndex = this.storageService.getSelectedPageIndex();
            if(pageIndex > 1) {
              this.router.navigate(['/ip-addresses'], {queryParams: {page: pageIndex}});
            }else{
              this.router.navigate(['/ip-addresses']);
            }
          });
        },
        error: ({error}) => {
          this.errors = error?.errors;
        }
      });
    }
  }

}
