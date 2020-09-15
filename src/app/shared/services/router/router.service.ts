import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  currentURL: string;

  constructor(private router: Router) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.currentURL = e.url;
        if (!this.router.navigated) {
          this.unSetAuxiliaryRoute();
        }
      }
    });
  }

  unSetAuxiliaryRoute() {
    console.log('currentURL: ', this.currentURL);
    const matchedURLGroups = this.currentURL.match(
      /(?<primaryPath>(?:\/[-\w-~.]*)+)\((?<auxiliaryPath>\w*:(?:[-\w~.]*\/?)+)\)/
    )?.groups;
    console.log('matched: ', matchedURLGroups);
    if (matchedURLGroups) {
      const {
        primaryPath: primary,
        auxiliaryPath: auxiliary,
      } = matchedURLGroups;
      setTimeout(() => {
        console.log('auxiliaryPath', auxiliary);
        return this.router.navigateByUrl(primary);
      }, 100);
    }
  }
}
