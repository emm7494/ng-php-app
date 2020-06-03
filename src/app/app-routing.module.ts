import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'product-listing', pathMatch: 'full' },
  { path: 'product-listing', component: ProductListingComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'user-profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
