import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductListingListComponent } from './product-listing/product-listing-list/product-listing-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductModalComponent } from './modals/product-modal/product-modal.component';
import { FormsModule } from '@angular/forms';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductListingComponent,
    ShoppingCartComponent,
    UserProfileComponent,
    ProductListingListComponent,
    ProductModalComponent,
    LoginModalComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
