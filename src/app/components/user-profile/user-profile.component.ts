import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.profileForm = this.formBuilder.group({
      name: this.formBuilder.group({
        firstname: ['emma'],
        lastname: ['adu gyamfi'],
      }),
      email: ['me@email.com'],
      proceed: [false, Validators.required],
    });
  }
  saveProfile() {
    console.log(this.profileForm);
  }
}
