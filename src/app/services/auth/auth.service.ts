import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponseData } from '../../shared/models/auth-response-data/auth-response-data.model';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { CurrentUser } from '../../shared/models/user/user.model';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../../shared/models/cart/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<CurrentUser>(null);

  constructor(private http: HttpClient, private cartService: CartService) {}
  signUp(firstname: string, lastname: string, email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:4000/api/post_signup_user', {
        firstname,
        lastname,
        email,
        password,
      })
      .pipe(catchError((errorRes) => this.handleError(errorRes)));
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:4000/api/post_login_user', {
        email,
        password,
      })
      .pipe(
        catchError((errorRes) => this.handleError(errorRes)),
        tap((resData) => {
          this.handleAuthentication(resData);
        })
      );
  }
  logOut() {
    return this.http
      .post<AuthResponseData>('http://localhost:4000/api/post_logout_user', {})
      .pipe(
        tap(() => {
          localStorage.clear();
          this.currentUser.next(null);
        })
      );
  }
  private handleAuthentication(resData: AuthResponseData) {
    const currentUser = new CurrentUser(
      resData.data.user.id,
      resData.data.user.email,
      resData.data.user.firstname,
      resData.data.user.lastname,
      resData.data.user.created,
      resData.data.user.modified,
      resData.data.jwt,
      new Date(new Date().getTime() + +resData.data.payload.exp * 1000)
    );
    localStorage.setItem('jwt', resData.data.jwt);
    this.currentUser.next(currentUser);
    this.cartService.getUserCart().subscribe((items: CartItem[]) => {
      localStorage.setItem('cart', JSON.stringify(items));
    });
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
}
