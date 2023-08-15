import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subject } from 'rxjs';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  sidebarSubject$ = new Subject();
  sidebarCollapsed = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
  ) {}

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

  toggleSidebar() {
    this.sharedService.toggleSidebar();
  }

}
