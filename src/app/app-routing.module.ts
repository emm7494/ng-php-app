import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductComponent } from './components/product/product.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LogInComponent,
    outlet: 'modal',
  },
  {
    path: 'logout',
    component: LogOutComponent,
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
  { path: 'sign-up', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
