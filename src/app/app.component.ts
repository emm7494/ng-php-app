import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { RouterService } from './shared/services/router/router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private routerService: RouterService
  ) {}

  ngOnInit() {
    this.authService.mountCurrentUser();
    if (this.authService.currentUser.value) {
      this.authService.setAutoLogoutTimer(
        +this.authService.currentUser.value.jwtEXP * 1000 - new Date().getTime()
      );
    }
  }

  ngAfterViewInit() {}
}
