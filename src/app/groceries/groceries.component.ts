import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-groceries',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './groceries.component.html',
  styleUrl: './groceries.component.scss',
})
export class GroceriesComponent {
  dayState: DayState = new DayState();

  constructor() {
    this.dayState.sections = [
      new Section('Monday', ['Chicken', 'Cheese', 'Bread']),
      new Section('Breakfast', ['Yogurt', 'Granola']),
    ];
  }

  addItem(inputElement: HTMLInputElement, section: string) {
    if (inputElement.value === '' || section.trim() === '') return;

    this.dayState.addItem(section, inputElement.value);

    inputElement.value = '';
  }

  addSection(inputTag: HTMLInputElement) {
    this.dayState.sections.push(new Section(inputTag.value, []));
    inputTag.value = '';
  }
}

export class DayState {
  sections: Section[] = [];

  addItem(section: string, item: string) {
    const sectionIndex = this.sections.findIndex((s) => s.name === section);
    if (sectionIndex !== -1) {
      this.sections[sectionIndex].items.push(item);
    }
  }
}

export class Section {
  name: string;
  items: string[];

  constructor(name: string, items: string[]) {
    this.name = name;
    this.items = items;
  }
}
