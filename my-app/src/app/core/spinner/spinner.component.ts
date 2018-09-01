import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

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

  ngOnInit() {
    
  }

}
