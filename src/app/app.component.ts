import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-php-app';
  loginModalVisible = true;
  // loginModalVisible = false;

  showLoginModal(status: boolean) {
    this.loginModalVisible = status;
  }
}
