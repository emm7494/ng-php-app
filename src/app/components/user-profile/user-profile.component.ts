import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserService } from '../../shared/services/user/user.service';
import { CurrentUser } from '../../shared/models/user/user.model';
import { StorageService } from '../../shared/services/storage/storage.service';
import { CustomValidators } from '../../validators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: CurrentUser;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.storageService.mountedCurrentUser.subscribe(
      (user) => (this.user = user)
    );
    this.profileForm = this.formBuilder.group(
      {
        name: this.formBuilder.group({
          firstname: [null, [Validators.required]],
          lastname: [null, [Validators.required]],
        }),
        password: [{ value: null, disabled: true }],
        password2: [{ value: null, disabled: true }],
        email: [{ value: null, disabled: true }, [Validators.email]],
        proceed: [null, [Validators.requiredTrue]],
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
    return this.profileForm.controls;
  }

  get n() {
    return this.f.name as FormGroup;
  }
  get p2E() {
    return this.f.password2.errors as ValidationErrors;
  }

  saveProfile() {
    console.log(this.profileForm);
    if (this.profileForm.valid) {
      this.userService
        .patchUserProfile(this.profileForm.getRawValue().name)
        .subscribe((res) => {
          console.log(res);
          this.profileForm.reset();
        });
    }
  }
}
