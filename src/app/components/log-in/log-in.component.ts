import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/shared/components/modal/modal/modal.component';
import { AuthResponseData } from 'src/app/shared/models/auth-response-data/auth-response-data.model';
import { CurrentUser } from 'src/app/shared/models/user/user.model';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  res: AuthResponseData;
  currentUser: CurrentUser;
  loginForm: FormGroup;
  isLoading: boolean;
  title: string;
  nextRoute: null | string;
  modalJQueryElement: JQuery<HTMLElement>;
  @ViewChild('modalComponent') modalComponent: ModalComponent;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title = 'LOGIN';
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: true,
    });
    this.nextRoute = this.route.snapshot.queryParams.next ?? null;
  }
  logIn(credentials: { email: string; password: string }) {
    this.isLoading = true;
    setTimeout(() => {
      this.authService.logIn(credentials.email, credentials.password).subscribe(
        (res) => {
          // this.isLoading = false;
          this.res = res;
          console.log(res);
          // this.modalComponent.onClose();
          // if (this.nextRoute) {
          //   this.router.navigate([this.nextRoute]);
          // }
        },
        (error) => {
          this.isLoading = false;
          this.res = error.error;
          console.error(error);
        },
        () => {
          setTimeout(() => {
            if (this.nextRoute) {
              this.router.navigate([this.nextRoute]);
            }
            this.modalComponent.onClose();
          }, 500);
        }
      );
    }, 1000);
  }
}
