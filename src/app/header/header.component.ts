import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  faUserCircle,
  faShoppingCart,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { CurrentUser } from '../shared/models/user/user.model';

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
  private currentUserSubscription: Subscription;

  @Output() showLoginModal: EventEmitter<boolean> = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUser.subscribe(
      (currentUser: CurrentUser) => {
        this.isAuthenticated = !!currentUser;
        console.log(!!currentUser);
      }
    );
  }
  onShowLoginModal(e: Event) {
    this.showLoginModal.emit(true);
  }

  logOut(e: Event) {
    e.preventDefault();
    this.authService.logOut().subscribe(
      (res) => {
        this.showLoginModal.emit(false);
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}
