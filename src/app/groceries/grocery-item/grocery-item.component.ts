import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroceryItem } from '../models/grocery-models';

@Component({
  selector: 'app-grocery-item',
  imports: [FormsModule],
  templateUrl: './grocery-item.component.html',
  styleUrl: './grocery-item.component.scss',
})
export class GroceryItemComponent {
  groceryItem = input.required<GroceryItem>();
  itemChecked = output<GroceryItem>();

  handleItemChecked(item: GroceryItem) {
    this.itemChecked.emit(item);
  }
}
