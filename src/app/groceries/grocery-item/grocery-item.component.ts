import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grocery-item',
  imports: [],
  templateUrl: './grocery-item.component.html',
  styleUrl: './grocery-item.component.scss',
})
export class GroceryItemComponent {
  @Input({ required: true }) name: string = '';
}
