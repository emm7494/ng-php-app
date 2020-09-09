import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // loginModalVisible = true;
  loginModalVisible = false;
  ngOnInit() {
    
  }

  showLoginModal(status: boolean) {
    this.loginModalVisible = status;
  }
}
