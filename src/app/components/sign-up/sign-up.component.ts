import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CurrentUser } from 'src/app/shared/models/user/user.model';
import { AuthResponseData } from 'src/app/shared/models/auth-response-data/auth-response-data.model';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
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
