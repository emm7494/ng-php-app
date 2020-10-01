import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getUserProfile() {
    return this.http
      .get<User>(`${environment.apiURL}/get_user_profile`)
      .pipe(catchError((errorRes) => this.handleError(errorRes)));
  }
  patchUserProfile({ firstname, lastname }) {
    return this.http
      .patch<any>(`${environment.apiURL}/patch_user_profile`, {
        firstname,
        lastname,
      })
      .pipe(
        catchError((errorRes) => this.handleError(errorRes)),
        tap((resData) => {
          this.handleResponse(resData);
        })
      );
  }

  handleResponse(resData) {
    const currentUser = this.storageService.currentUser;
    currentUser.firstname = resData.firstname;
    currentUser.lastname = resData.lastname;
    this.storageService.currentUser = currentUser;
    this.storageService.mountCurrentUser();
  }
  handleError(errorRes) {
    return throwError(errorRes);
  }
}
