import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IpAddressService } from '../../services/ip-address.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ISingleIp } from '../../ip-address.models';
import { Observable, finalize } from 'rxjs';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ip-address-edit',
  templateUrl: './ip-address-edit.component.html',
  styleUrls: ['./ip-address-edit.component.scss']
})
export class IpAddressEditComponent implements OnInit, OnDestroy {

  form: FormGroup;
  id: number;
  ipAddress$: Observable<ISingleIp>;
  submitting = false;
  loading = false;
  errors: any;
  subscriptions = new SubSink();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ipAddressService: IpAddressService,
    private route: ActivatedRoute,
    private storageService: StorageService,
  ) {
    this.id = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      label: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loading = true;
    if(this.storageService.ipAddress.selectedIp) {
      this.ipAddress$ = this.storageService.getSelectedIpAddress();
    }else{
      this.ipAddress$ = this.ipAddressService.getSingleIp(this.id);
    }

    this.subscriptions.sink = this.ipAddress$.subscribe(result => {
      this.loading = false;
      if(result){
        this.form.get('label').setValue(result?.label);
      }
    });
  }

  goToNewIpList() {
    this.router.navigate(['ip-addresses']);
  }

  handleSubmit() {
    this.submitting = true;
    if(this.form.valid) {
      this.ipAddressService.updateIp(this.form.value, this.id)
      .pipe(finalize(() => this.submitting = false)).subscribe({
        next: response => {
          this.storageService.setIpAddresses(null);
          this.storageService.setSelectedIpAddress(null);
          Swal.fire({
            title: 'Success!',
            text: 'IP Address has been updated successfully.',
            icon: 'success',
            confirmButtonText: 'OKAY'
          }).then(() => {
            this.router.navigate(['/ip-addresses']);
          });
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
