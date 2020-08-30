import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductModalComponent } from './modals/product-modal/product-modal.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'product-listing', pathMatch: 'full' },
  {
    path: 'product-listing',
    component: ProductListingComponent,
    children: [
      { path: 'product-modal/:product-id', component: ProductModalComponent },
    ],
  },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
