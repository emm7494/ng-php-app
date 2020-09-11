import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loginModalVisible = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.mountCurrentUser();
    if (this.authService.currentUser.value) {
      this.authService.setAutoLogoutTimer(
        +this.authService.currentUser.value.jwtEXP * 1000 - new Date().getTime()
      );
    }
  }

  showLoginModal(status: boolean) {
    this.loginModalVisible = status;
  }
}
