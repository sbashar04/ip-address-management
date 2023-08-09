import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ip-address-list',
  templateUrl: './ip-address-list.component.html',
  styleUrls: ['./ip-address-list.component.scss']
})
export class IpAddressListComponent {

  constructor(
    private router: Router,
  ){

  }


  goToNewIpForm() {
    this.router.navigate(['ip-addresses/create']);
  }
}
