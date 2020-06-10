import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListingListComponent } from './product-listing-list.component';

describe('ProductListingListComponent', () => {
  let component: ProductListingListComponent;
  let fixture: ComponentFixture<ProductListingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
