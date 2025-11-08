import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroceryItemComponent } from './grocery-item/grocery-item.component';
import { GroceryItem, Section, State } from './models/grocery-models';

@Component({
  selector: 'app-groceries',
  imports: [FormsModule, GroceryItemComponent],
  templateUrl: './groceries.component.html',
  styleUrl: './groceries.component.scss',
})
export class GroceriesComponent {
  dayState: State = new State();

  constructor() {
    this.dayState.setMockState();
  }

  addItem(inputElement: HTMLInputElement, section: Section) {
    if (inputElement.value === '' || section == null) return;

    const newItem = new GroceryItem(
      crypto.randomUUID().toString(),
      inputElement.value
    );

    this.dayState.addItem(section, newItem);

    inputElement.value = '';
  }

  addSection(inputElement: HTMLInputElement) {
    if (inputElement.value === '') return;

    this.dayState.sections.push(new Section(inputElement.value, []));
    inputElement.value = '';
  }

  handleItemChecked(section: Section, item: GroceryItem) {
    console.log(
      `${item.id} ${item.name} set to ${item.isChecked} in ${section.name}`
    );
  }

  handleItemDeleted(section: Section, item: GroceryItem) {
    this.dayState.deleteItem(section, item);
  }
}
