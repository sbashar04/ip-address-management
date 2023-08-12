import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IpAddressService } from '../../services/ip-address.service';
import { finalize } from 'rxjs';
import { SubSink } from 'subsink';
import { IIpAddressList } from '../../ip-address.models';

@Component({
  selector: 'app-ip-address-list',
  templateUrl: './ip-address-list.component.html',
  styleUrls: ['./ip-address-list.component.scss']
})
export class IpAddressListComponent implements OnInit, OnDestroy {

  isLoading = false;
  errors: any = null;
  ipAddresses: IIpAddressList = null;
  subscriptions = new SubSink();

  constructor(
    private router: Router,
    private ipAddressService: IpAddressService,
  ){

  }

  ngOnInit(): void {
    this.ipAddressService.getIpAddresses()
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: response => {
        console.log(response);
        this.ipAddresses = response;
      },
      error: ({error}) => {
        console.log(error);
        this.errors = error?.errors;
      }
    });
  }

  goToNewIpForm() {
    this.router.navigate(['ip-addresses/create']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
