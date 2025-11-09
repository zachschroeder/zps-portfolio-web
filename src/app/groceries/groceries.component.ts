import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroceryItemComponent } from './grocery-item/grocery-item.component';
import { GroceryItem, Section } from './models/grocery-models';
import { GroceryState } from './models/grocery-state';

@Component({
  selector: 'app-groceries',
  imports: [FormsModule, GroceryItemComponent],
  templateUrl: './groceries.component.html',
  styleUrl: './groceries.component.scss',
})
export class GroceriesComponent {
  state = new GroceryState();

  constructor() {
    this.state.refresh();
  }

  refresh() {
    this.state.refresh();
  }

  addItem(inputElement: HTMLInputElement, section: Section) {
    if (inputElement.value === '' || section == null) return;

    const newItem = new GroceryItem(
      crypto.randomUUID().toString(),
      inputElement.value
    );

    this.state.addItem(section, newItem);

    inputElement.value = '';
  }

  addSection(inputElement: HTMLInputElement) {
    if (inputElement.value === '') return;

    this.state.addSection(inputElement.value);

    inputElement.value = '';
  }

  handleItemChecked(section: Section, item: GroceryItem) {
    console.log(
      `${item.id} ${item.name} set to ${item.isChecked} in ${section.name}`
    );
  }

  handleItemDeleted(item: GroceryItem) {
    this.state.deleteItem(item);
  }
}
