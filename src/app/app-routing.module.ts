import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignUpComponent } from './signup/signup.component';
import { ProductModalComponent } from './modals/product-modal/product-modal.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';

// export function htmlFiles(url: UrlSegment[]) {
//   return url.length > 0 && url[url.length - 1].path.endsWith('login')
//     ? { consumed: url }
//     : null;
// }

const routes: Routes = [
  {
    path: 'login',
    component: LoginModalComponent,
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
