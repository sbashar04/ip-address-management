import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ip-address-create',
  templateUrl: './ip-address-create.component.html',
  styleUrls: ['./ip-address-create.component.scss']
})
export class IpAddressCreateComponent {

  constructor(
    private router: Router,
  ) {

  }

  goToNewIpList() {
    this.router.navigate(['ip-addresses']);
  }
}
