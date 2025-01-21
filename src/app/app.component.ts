import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  showLoadingIndicator = true;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      } else if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }
    });
  }
}
