import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { CartComponent } from './cart/cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectivesModule } from '../shared/directives/directives.module';
import { ModalModule } from '../shared/components/modal/modal.module';
import { ProductComponent } from './product/product.component';
import { LogInComponent } from './log-in/log-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogOutComponent } from './log-out/log-out.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductListingComponent,
    CartComponent,
    UserProfileComponent,
    SignUpComponent,
    LogInComponent,
    ProductComponent,
    LogOutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    DirectivesModule,
    ModalModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductListingComponent,
    CartComponent,
    UserProfileComponent,
    SignUpComponent,
    LogInComponent,
    ProductComponent,
  ],
})
export class ComponentsModule {}
