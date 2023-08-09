import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ip-address-edit',
  templateUrl: './ip-address-edit.component.html',
  styleUrls: ['./ip-address-edit.component.scss']
})
export class IpAddressEditComponent {

  constructor(
    private router: Router,
  ) {

  }

  goToNewIpList() {
    this.router.navigate(['ip-addresses']);
  }
}
