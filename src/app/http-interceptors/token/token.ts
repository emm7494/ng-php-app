import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth/auth.service';
import { StorageService } from '../../shared/services/storage/storage.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const currentUser = this.storageService.mountedCurrentUser.value;
    if (currentUser) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + currentUser.jwt,
        },
      });
      console.log('token valid!');
      return next.handle(authReq);
    }
    console.log('token invalid!');
    return next.handle(request);
  }
}
