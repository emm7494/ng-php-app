import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private authService: AuthService, private router: Router) {}

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
