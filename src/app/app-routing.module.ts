import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { SignUpComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LogInComponent } from './shared/components/modals/login/login.component';
import { ProductComponent } from './shared/components/modals/product/product.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LogInComponent,
    outlet: 'modal',
  },
  {
    path: 'product/:product-id',
    component: ProductComponent,
    outlet: 'modal',
  },
  // { path: '', redirectTo: 'product-listing', pathMatch: 'full' },
  {
    path: '',
    component: ProductListingComponent,
  },
  { path: 'cart', component: CartComponent },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
