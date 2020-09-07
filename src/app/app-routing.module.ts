import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignUpComponent } from './signup/signup.component';
import { ProductModalComponent } from './modals/product-modal/product-modal.component';
import { ProductListingComponent } from './product-listing/product-listing.component';

const routes: Routes = [
  // { path: '', redirectTo: 'product-listing', pathMatch: 'full' },
  {
    path: '',
    component: ProductListingComponent,
    children: [
      {
        path: 'product-modal/:product-id',
        component: ProductModalComponent,
        data: { showModal: true },
      },
    ],
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
