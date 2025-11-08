import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroceryItem } from '../models/grocery-models';

@Component({
  selector: 'app-grocery-item',
  imports: [FormsModule],
  templateUrl: './grocery-item.component.html',
  styleUrl: './grocery-item.component.scss',
})
export class GroceryItemComponent {
  @Input({ required: true }) groceryItem!: GroceryItem;
}
