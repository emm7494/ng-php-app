import { Component, OnInit } from '@angular/core';
import {
  faUserCircle,
  faShoppingCart,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faUserCircle = faUserCircle;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faSignOutAlt = faSignOutAlt;
  loginModalVisible = false;
  constructor() {}

  ngOnInit(): void {}

  showLoginModal(e: Event) {
    e.preventDefault();
    this.loginModalVisible = true;
  }
}
