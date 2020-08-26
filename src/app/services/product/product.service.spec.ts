import { TestBed } from '@angular/core/testing';

import { ProductModalService } from './product.service';

describe('ProductModalService', () => {
  let service: ProductModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
