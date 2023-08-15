import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SharedService } from './services/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  isLoginPage = false;

  sidebarCollapse = false;

  constructor(
    private router: Router,
    private sharedService: SharedService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if(event.url === '/login') {
          this.isLoginPage = true;
        }else{
          this.isLoginPage = false;
        }
      }
    });

    this.sharedService.sidebarCollapseStatus.subscribe(result => this.sidebarCollapse = result);
  }
}
