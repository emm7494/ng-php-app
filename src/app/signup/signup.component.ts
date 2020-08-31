import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { CurrentUser } from '../shared/models/user/user.model';
import { AuthResponseData } from '../shared/models/auth-response-data/auth-response-data.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  error: object;
  res: AuthResponseData;
  currentUser: CurrentUser;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signUp();
  }
  signUp() {
    this.authService
      .signUp('Emmanuel', 'Adu Gyamfi', 'emm7494@gmail.com', 'password')
      .subscribe(
        (res) => {
          this.res = res;
        },
        (error) => {
          this.error = error.error;
        }
      );
  }
}
