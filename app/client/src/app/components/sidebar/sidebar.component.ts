import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterLink } from '@angular/router';
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
    this.subscriptions.sink = this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.currentUrlPath = event.url.split('?')[0];
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
