import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../shared/services/storage/storage.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwt = this.storageService.currentUser?.jwt;
    if (jwt) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwt,
        },
      });
      console.log('token valid!');
      return next.handle(authReq);
    }
    console.log('token invalid!');
    return next.handle(request);
  }
}
