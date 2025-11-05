import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: false,
})
export class NavigationComponent {
  // Boolean used to toggle .is-active on navbar-burger and navbar-menu
  isActiveToggle = false;

  // Toggles navbar-burger between burger icon and 'x' icon
  // Also shows and hides navbar-menu
  toggleBurgerAndMenu() {
    this.isActiveToggle = !this.isActiveToggle;
  }
}
