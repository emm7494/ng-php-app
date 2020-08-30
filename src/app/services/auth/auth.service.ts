import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { AuthResponseData } from '../../shared/models/auth-response-data/auth-response-data.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(firstname: string, lastname: string, email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:4000/api/post_signup_user', {
        firstname,
        lastname,
        email,
        password,
      })
      .pipe(catchError(this.handleError));
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:4000/api/post_login_user', {
        email,
        password,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
}
