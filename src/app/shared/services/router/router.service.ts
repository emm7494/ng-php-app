import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  currentURL: string;
  pageReloaded = false;

  constructor(private router: Router) {
    console.log('ready..');
    // console.log('router: ', this.router.routerState.snapshot.url);
    // console.log('route: ', this.route.snapshot.url);
    // const primaryURL = this.router.routerState.snapshot.url.split(
    //   /\/([\w-~.]+)\(/gi
    // )[1];
    // console.log(primaryURL);
    // router.events.subscribe((event) => {
    //   if (event instanceof NavigationStart) {
    //     console.log(event.url);
    //     console.log(router.navigated);
    //   }
    // });
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentURL = e.url;
        if (!this.pageReloaded) {
          this.unSetAuxiliaryRoute();
        }
      }
      if (e instanceof NavigationStart) {
        this.pageReloaded = this.router.navigated;
      }
    });
  }

  unSetAuxiliaryRoute() {
    // console.log('currentURL @ service: ', this.currentURL);
    // const primaryURL = this.router.routerState.snapshot.url.split(
    //   /\/([\w-~.]+)\(/gi
    // )[1];
    // const primaryURL = this.currentURL.split(/(?:\/)([\w-~.]+)(?:\()/gi)[1];
    const matchedURLGroups = this.currentURL.match(
      /(?<primaryPath>(?:\/[-\w-~.]*)+)\((?<auxiliaryPath>\w*:(?:[-\w~.]*\/?)+)\)/
    )?.groups;
    if (matchedURLGroups) {
      const { primaryPath } = matchedURLGroups;
      const parts = primaryPath.split('/')[1];
      const primary = !!parts ? parts : null;
      setTimeout(() => {
        return this.router.navigate([
          {
            outlets: {
              primary,
              modal: null,
            },
          },
        ]);
      }, 100);
    }
  }
}
