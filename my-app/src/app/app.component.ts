import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showLoadingSpinner = true;
  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingSpinner = true;
      }
      if (routerEvent instanceof NavigationEnd || 
        routerEvent instanceof NavigationCancel || 
        routerEvent instanceof NavigationError) {
        this.showLoadingSpinner = false;
      }
    });
  }
}
