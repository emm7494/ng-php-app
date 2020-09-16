import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthResponseData } from 'src/app/shared/models/auth-response-data/auth-response-data.model';
import { CurrentUser } from 'src/app/shared/models/user/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LogInComponent implements OnInit {
  res: AuthResponseData = { message: '', error: false };
  currentUser: CurrentUser;
  loginForm: FormGroup;
  isLoading = false;
  title = 'LOGIN';
  nextRoute: null | string;
  modalJQueryElement: JQuery<HTMLElement>;
  @ViewChild(ModalComponent) modalComponent: ModalComponent;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: true,
    });
    this.nextRoute = this.route.snapshot.queryParams.next ?? null;
  }
  logIn(credentials: any) {
    this.isLoading = true;
    this.title = null;
    setTimeout(() => {
      this.authService.logIn(credentials.email, credentials.password).subscribe(
        (res) => {
          this.isLoading = false;
          this.res = res;
          console.log(res);
          this.res = { message: '', error: false };
          this.modalComponent.onClose();
          if (this.nextRoute) {
            this.router.navigate([this.nextRoute]);
          }
        },
        (error) => {
          this.isLoading = false;
          this.res = error.error;
          setTimeout(() => {
            this.res = { message: '', error: false };
          }, 4000);
        },
        () => {}
      );
    }, 10000);
  }
}
