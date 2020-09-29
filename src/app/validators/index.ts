import { FormGroup } from '@angular/forms';
export class CustomValidators {
  static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (control.errors && control.errors.requiredIf) {
        matchingControl.setErrors(null);
        return;
      }
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  static requiredIf(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const requiredIfControl = formGroup.controls[matchingControlName];
      if (control.errors && !control.errors.requiredIf) {
        return;
      }
      if (!control.value && requiredIfControl.value) {
        control.setErrors({ requiredIf: true });
      } else {
        control.setErrors(null);
      }
    };
  }
}
