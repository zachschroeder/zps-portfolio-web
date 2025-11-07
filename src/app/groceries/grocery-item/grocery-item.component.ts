import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grocery-item',
  imports: [FormsModule],
  templateUrl: './grocery-item.component.html',
  styleUrl: './grocery-item.component.scss',
})
export class GroceryItemComponent {
  @Input({ required: true }) name: string = '';
  isChecked: boolean = false;
}
