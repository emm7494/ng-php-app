import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthResponseData } from 'src/app/shared/models/auth-response-data/auth-response-data.model';
import { CurrentUser } from 'src/app/shared/models/user/user.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  // error = true;
  error: object;
  res: AuthResponseData;
  currentUser: CurrentUser;
  @Input() showModal;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.logIn();
  }

  logIn() {
    this.authService.logIn('emm7494@gmail.com', 'password').subscribe(
      (res) => {
        this.res = res;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      },
      (error) => {
        this.error = error.error;
      }
    );
  }

  onClose() {
    // setTimeout(() => (this.showModal = false), 4000);
  }
}
