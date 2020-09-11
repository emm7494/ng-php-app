import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { CartItem } from 'src/app/shared/models/cart/cart-item.model';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { CurrentUser } from 'src/app/shared/models/user/user.model';
import { AuthResponseData } from 'src/app/shared/models/auth-response-data/auth-response-data.model';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  autoLogoutTimerID: any;
  currentUser = new BehaviorSubject<CurrentUser>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService,
    private storageService: StorageService
  ) {}
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
          this.unMountCurrentUser();
          this.storageService.emptyLocalStorage();
          clearTimeout(this.autoLogoutTimerID);
          this.router.navigate(['/']);
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
    this.storageService.currentUser = currentUser;
    this.mountCurrentUser();
    this.cartService.getUserCart().subscribe((items: CartItem[]) => {
      this.cartService.addCartItems(items, false);
    });
    this.autoLogout(5000);
  }

  mountCurrentUser() {
    this.currentUser.next(this.storageService.currentUser);
  }
  unMountCurrentUser() {
    this.currentUser.next(null);
  }

  autoLogout(TTL: number) {
    if (this.currentUser.value) {
      clearTimeout(this.autoLogoutTimerID);
      this.autoLogoutTimerID = setTimeout(() => {
        this.logOut().subscribe(
          (res) => {
            console.log(res);
          },
          (errorRes) => {
            console.error(errorRes);
          }
        );
      }, TTL);
    }
    console.log(this.autoLogoutTimerID);
  }
  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes);
  }
}
