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

  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
  ) {}

  async logout(){
    Swal.fire({
      title: 'Please Wait!',
      text: 'We are logging you out.',
      icon: 'success',
      showConfirmButton: false
    });

    this.authService.logout().subscribe(result => {
      if('success' in result && result.success === true) {
        localStorage.removeItem('remember');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        Swal.close();
        this.router.navigate(['login']);
      }
    });
  }

  toggleSidebar() {
    this.sharedService.toggleSidebar();
  }

}
