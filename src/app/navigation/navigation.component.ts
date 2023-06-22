import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  // Toggles navbar-burger between burger icon and 'x' icon
  // Also shows and hides navbar-menu
  toggleBurgerAndMenu() {
    document.querySelector('.navbar-burger')?.classList.toggle('is-active');
    document.querySelector('.navbar-menu')?.classList.toggle('is-active');
  }
}
