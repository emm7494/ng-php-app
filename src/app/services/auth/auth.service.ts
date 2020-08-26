import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from '../../shared/models/auth-response-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'http://localhost:4000/api/post_signup_user',
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }
}
