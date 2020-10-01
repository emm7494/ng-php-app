import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CurrentUser } from 'src/app/shared/models/user/user.model';
import { AuthResponseData } from 'src/app/shared/models/auth-response-data/auth-response-data.model';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { CustomValidators } from 'src/app/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  // user: CurrentUser;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.storageService.mountedCurrentUser.subscribe(
    //   (user) => (this.user = user)
    // );
    this.signUpForm = this.formBuilder.group(
      {
        name: this.formBuilder.group({
          firstname: [null, [Validators.required]],
          lastname: [null, [Validators.required]],
        }),
        password: [null, [Validators.required]],
        password2: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        agree: [null, [Validators.requiredTrue]],
      },
      {
        validators: [
          CustomValidators.requiredIf('password', 'password2'),
          CustomValidators.requiredIf('password2', 'password'),
          CustomValidators.mustMatch('password', 'password2'),
        ],
      }
    );

    // this.userService.getUserProfile().subscribe((user: User) => {
    //   // this.user = user;
    //   console.log(user.firstname);
    //   this.profileForm = this.formBuilder.group({
    //     name: this.formBuilder.group({
    //       firstname: [user.firstname],
    //       lastname: [user.lastname],
    //     }),
    //     email: [user.email],
    //     proceed: [false, Validators.required],
    //   });
    // });
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  get f() {
    return this.signUpForm.controls;
  }

  get n() {
    return this.f.name as FormGroup;
  }
  get p2E() {
    return this.f.password2.errors as ValidationErrors;
  }
  get e2E() {
    return this.f.email.errors as ValidationErrors;
  }

  signUp() {
    console.log(this.signUpForm);
    if (this.signUpForm.valid) {
      const { name, email, password } = this.signUpForm.getRawValue();
      this.authService
        .signUp(name.firstname, name.lastname, email, password)
        .subscribe(
          (res) => {
            console.log(res);
            this.signUpForm.reset();
            this.router.navigate([
              { outlets: { primary: null, modal: ['login'] } },
            ]);
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }
  // error: object;
  // res: AuthResponseData;
  // currentUser: CurrentUser;

  // constructor(private authService: AuthService) {}

  // ngOnInit(): void {
  //   this.signUp();
  // }
  // signUp() {
  //   this.authService
  //     .signUp('Emmanuel', 'Adu Gyamfi', 'emm7494@gmail.com', 'password')
  //     .subscribe(
  //       (res) => {
  //         this.res = res;
  //       },
  //       (error) => {
  //         this.error = error.error;
  //       }
  //     );
  // }
}
