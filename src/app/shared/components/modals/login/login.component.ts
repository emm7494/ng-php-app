import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthResponseData } from 'src/app/shared/models/auth-response-data/auth-response-data.model';
import { CurrentUser } from 'src/app/shared/models/user/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LogInComponent implements OnInit, AfterViewInit {
  res: AuthResponseData = { message: '', error: false };
  currentUser: CurrentUser;
  loginForm: FormGroup;
  loggingIn = false;

  nextRoute: null | string;
  modalJQueryElement: JQuery<HTMLElement>;

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
    this.nextRoute = this.route.snapshot.queryParams.next;
    console.log('next after login: ', this.route.snapshot.queryParams.next);
  }
  ngAfterViewInit() {
    this.modalJQueryElement = $('#loginModal');
    this.modalJQueryElement.on('shown.bs.modal', () => {
      // $('#inputEmail').trigger('focus');
    });
    this.modalJQueryElement.on('hidden.bs.modal', () => {
      this.router.navigate(['..']);
    });
    this.modalJQueryElement.modal('show');
  }

  onClose() {
    this.modalJQueryElement.modal('hide');
  }
  logIn(credentials: any) {
    this.loggingIn = true;
    this.authService.logIn(credentials.email, credentials.password).subscribe(
      (res) => {
        this.loggingIn = false;
        this.res = res;
        console.log(res);
        this.res = { message: '', error: false };
        this.router.navigate([this.route.snapshot.queryParams.next]);
      },
      (error) => {
        this.loggingIn = false;
        this.res = error.error;
        setTimeout(() => {
          this.res = { message: '', error: false };
        }, 4000);
      }
    );
  }
}
