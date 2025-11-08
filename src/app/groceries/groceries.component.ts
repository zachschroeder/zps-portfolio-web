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
  mealState: State = new State();
  storeState: State = new State();
  selectedState = this.mealState;
  isMealViewSelected: boolean = true;

  constructor() {
    this.mealState.setMockState();
  }

  refresh() {
    this.mealState.setMockState();
    this.storeState.sections = [];
  }

  addItem(inputElement: HTMLInputElement, section: Section) {
    if (inputElement.value === '' || section == null) return;

    const newItem = new GroceryItem(
      crypto.randomUUID().toString(),
      inputElement.value
    );

    this.selectedState.addItem(section, newItem);

    inputElement.value = '';
  }

  addSection(inputElement: HTMLInputElement) {
    if (inputElement.value === '') return;

    this.selectedState.sections.push(new Section(inputElement.value, []));
    inputElement.value = '';
  }

  handleItemChecked(section: Section, item: GroceryItem) {
    console.log(
      `${item.id} ${item.name} set to ${item.isChecked} in ${section.name}`
    );
  }

  handleItemDeleted(section: Section, item: GroceryItem) {
    this.selectedState.deleteItem(section, item);
  }

  selectMealView() {
    this.isMealViewSelected = true;
    this.selectedState = this.mealState;
  }

  selectStoreView() {
    this.isMealViewSelected = false;
    this.selectedState = this.storeState;
  }
}
