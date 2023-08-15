import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IpAddressService } from '../../services/ip-address.service';
import { Observable, finalize } from 'rxjs';
import { SubSink } from 'subsink';
import { IIpAddressList, ISingleIp } from '../../ip-address.models';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-ip-address-list',
  templateUrl: './ip-address-list.component.html',
  styleUrls: ['./ip-address-list.component.scss']
})
export class IpAddressListComponent implements OnInit, OnDestroy {

  isLoading = false;
  errors: any = null;
  ipAddresses$: Observable<IIpAddressList>;
  ipAddressList: IIpAddressList = null;
  subscriptions = new SubSink();
  isIpAddressUpdated = false;

  constructor(
    private router: Router,
    private ipAddressService: IpAddressService,
    private storageService: StorageService,
  ){

  }

  ngOnInit(): void {
    this.isLoading = true;

    this.isIpAddressUpdated = this.storageService.isIpAddressUpdated;
    this.storageService.isIpAddressUpdated = false;

    if(this.storageService.ipAddresses) {
      this.ipAddresses$ = this.storageService.getIpAddresses();
    }else{
      this.ipAddresses$ = this.ipAddressService.getIpAddresses();
    }

    this.subscriptions.sink = this.ipAddresses$.pipe(finalize(() => this.isLoading = false)).subscribe({
      next: response => {
        this.ipAddressList = response;
        this.storageService.setIpAddresses(this.ipAddressList);
      },
      error: ({error}) => {
        this.errors = error?.errors;
      }
    });
  }

  goToNewIpForm() {
    this.router.navigate(['ip-addresses/create']);
  }

  setSelectedIpAddress(ipAddress: ISingleIp) {
    this.storageService.setSelectedIpAddress(ipAddress);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
