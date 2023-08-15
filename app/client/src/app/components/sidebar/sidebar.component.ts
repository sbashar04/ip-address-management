import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {

  @Input() collapse = false;
  currentUrlPath = '';
  subscriptions = new SubSink();

  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.currentUrlPath = event?.urlAfterRedirects.split("?")[0];
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
