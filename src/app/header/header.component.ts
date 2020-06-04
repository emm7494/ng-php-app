import { Component, OnInit } from '@angular/core';
import {
  faUserCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faUserCircle = faUserCircle;
  constructor() {}

  ngOnInit(): void {}
}
