import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http
      .get<User>(`${environment.apiURL}/get_user_profile`)
      .pipe(catchError((errorRes) => this.handleError(errorRes)));
  }
  postUserProfile(firstname, lastname, password) {
    return this.http.post<any>(`${environment.apiURL}/get_user_profile`, {
      firstname,
      lastname,
      password,
    });
  }
  handleError(errorRes) {
    return throwError(errorRes);
  }
}
