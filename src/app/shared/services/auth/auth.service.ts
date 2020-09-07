import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart/cart-item.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { CurrentUser } from 'src/app/shared/models/user/user.model';
import { AuthResponseData } from 'src/app/shared/models/auth-response-data/auth-response-data.model';

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
      resData.data.payload.nbf,
      resData.data.payload.exp
    );
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.currentUser.next(currentUser);
    this.cartService.getUserCart().subscribe((items: CartItem[]) => {
      localStorage.setItem('cart', JSON.stringify(items));
    });
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
}
