import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { SignUpComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LogInModalComponent } from './shared/shared-components/modals/login-modal/login-modal.component';
import { ProductModalComponent } from './shared/shared-components/modals/product-modal/product-modal.component';

const routes: Routes = [
  {
    path: 'login',
    component: LogInModalComponent,
    outlet: 'modal',
  },
  {
    path: 'product/:product-id',
    component: ProductModalComponent,
    outlet: 'modal',
  },
  // { path: '', redirectTo: 'product-listing', pathMatch: 'full' },
  {
    path: '',
    component: ProductListingComponent,
  },
  { path: 'cart', component: CartComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
