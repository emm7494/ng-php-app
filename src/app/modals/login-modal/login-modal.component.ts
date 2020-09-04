import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseData } from 'src/app/shared/models/auth-response-data/auth-response-data.model';
import { CurrentUser } from 'src/app/shared/models/user/user.model';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  res: AuthResponseData = { message: '', error: false };
  currentUser: CurrentUser;
  loginForm: FormGroup;
  loggingIn = false;

  @ViewChild('closeBtn') closeBtn;

  @Input() showModal;
  @Output() doShowModal: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: true,
    });
  }
  onClose() {
    setTimeout(() => this.doShowModal.emit(false), 4000);
  }
  logIn(credentials: any) {
    this.loggingIn = true;
    console.log(credentials.email, credentials.password);
    this.authService.logIn(credentials.email, credentials.password).subscribe(
      (res) => {
        this.loggingIn = false;
        this.res = res;
        console.log(res);
        setTimeout(() => {
          this.res = { message: '', error: false };
        }, 1000);
        setTimeout(() => {
          this.closeBtn.nativeElement.click();
          this.router.navigate(['/']);
        }, 1000);
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
