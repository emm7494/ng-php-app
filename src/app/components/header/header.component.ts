import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import {
  faUserCircle,
  faShoppingCart,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CurrentUser } from 'src/app/shared/models/user/user.model';
import { CartService } from '../../shared/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  faShoppingCart = faShoppingCart;
  faUserCircle = faUserCircle;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faSignOutAlt = faSignOutAlt;
  isAuthenticated = false;
  cartTotal: number;
  private currentUserSubscription: Subscription;
  @ViewChild('loginAnchor') loginAnchor;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartTotal.subscribe((total: number) => {
      this.cartTotal = total;
    });
    this.currentUserSubscription = this.authService.currentUser.subscribe(
      (user: CurrentUser) => {
        this.isAuthenticated = !!user;
      }
    );
  }
  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
