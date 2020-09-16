import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { CartComponent } from './cart/cart.component';
import { SignUpComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectivesModule } from '../shared/directives/directives.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductListingComponent,
    CartComponent,
    UserProfileComponent,
    SignUpComponent,
  ],
  imports: [CommonModule, RouterModule, FontAwesomeModule, DirectivesModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductListingComponent,
    CartComponent,
    UserProfileComponent,
    SignUpComponent,
  ],
})
export class ComponentsModule {}
