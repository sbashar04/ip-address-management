import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
  ) {
    this.user = this.authService.getUser();
  }

  logout(){
    Swal.fire({
      title: 'Please Wait!',
      text: 'We are logging you out.',
      imageUrl: 'assets/images/icon/loading-buffering.gif',
      showConfirmButton: false
    });

    this.authService.logout().subscribe(result => {
      if('success' in result && result.success === true) {
        this.authService.finalizeLogout();
        Swal.close();
        this.router.navigate(['login']);
      }
    });
  }

  toggleSidebar() {
    this.sharedService.toggleSidebar();
  }

}
