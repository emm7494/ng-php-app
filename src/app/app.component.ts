import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-php-app';
  // loginModalVisible = true;
  loginModalVisible = false;
  ngOnInit() {
    console.log('app');
  }

  showLoginModal(status: boolean) {
    this.loginModalVisible = status;
  }
}
