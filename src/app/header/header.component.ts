import { AuthService } from 'src/app/shared/services/auth/auth.service';
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
import { CurrentUser } from 'src/app/shared/models/user/user.model';

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

  @Output() doShowLoginModal: EventEmitter<boolean> = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUser.subscribe(
      (user: CurrentUser) => {
        this.isAuthenticated = !!user;
      }
    );
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) ?? {};
    this.isAuthenticated = CurrentUser.tokenNotExpired(currentUser);
  }
  onShowLoginModal(e: Event) {
    this.doShowLoginModal.emit(true);
  }

  logOut(e: Event) {
    e.preventDefault();
    this.authService.logOut().subscribe(
      (res) => {
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
