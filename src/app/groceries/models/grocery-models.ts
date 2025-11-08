export class State {
  sections: Section[] = [];

  addItem(section: string, item: GroceryItem) {
    const sectionIndex = this.sections.findIndex((s) => s.name === section);
    if (sectionIndex !== -1) {
      this.sections[sectionIndex].items.push(item);
    }
  }

  setMockState() {
    this.sections = [
      new Section('Monday', [
        new GroceryItem('Chicken', true),
        new GroceryItem('Cheese'),
        new GroceryItem('Bread', true),
      ]),
      new Section('Breakfast', [
        new GroceryItem('Yogurt'),
        new GroceryItem('Granola'),
      ]),
    ];
  }
}

export class Section {
  name: string;
  items: GroceryItem[];

  constructor(name: string, items: GroceryItem[]) {
    this.name = name;
    this.items = items;
  }
}

export class GroceryItem {
  name: string;
  isChecked: boolean;

  constructor(name: string, isChecked: boolean = false) {
    this.name = name;
    this.isChecked = isChecked;
  }
}
