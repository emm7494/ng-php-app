import { Injectable } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  currentURL: string;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        console.log('Got the Event URL as ', event.url);
        this.currentURL = event.url;
        // console.log('Got the Event URL redirect as ', event.urlAfterRedirects);
        console.log('navigated: ', router.navigated);
        this.unSetAuxiliaryRoute();
      });

    // this.router.events.subscribe((e: any) => {
    //   if (e instanceof NavigationStart) {
    //     this.currentURL = e.url;
    //     console.log('this.router.navigated: ', this.router.navigated);
    //     if (!this.router.navigated) {
    //       this.unSetAuxiliaryRoute();
    //     }
    //   }
    // });
  }

  unSetAuxiliaryRoute() {
    console.log(this.currentURL);
  }

  // unSetAuxiliaryRoute() {
  //   console.log('currentURL: ', this.currentURL);
  //   const matchedURLGroups = this.currentURL.match(
  //     /(?<primaryPath>(?:\/[-\w-~.]*)+)\((?<auxiliaryPath>\w*:(?:[-\w~.]*\/?)+)\)/
  //   )?.groups;
  //   console.log('matched: ', matchedURLGroups);
  //   if (matchedURLGroups) {
  //     const {
  //       primaryPath: primary,
  //       auxiliaryPath: auxiliary,
  //     } = matchedURLGroups;
  //     console.log('auxiliaryPath', auxiliary);
  //     setTimeout(() => {
  //       this.router.navigateByUrl(primary);
  //     }, 100);
  //   }
  // }
}
