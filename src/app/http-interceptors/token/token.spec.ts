import { TestBed } from '@angular/core/testing';

import { HttpInterceptorInterceptor } from './token';

describe('HttpInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpInterceptorInterceptor = TestBed.inject(HttpInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
