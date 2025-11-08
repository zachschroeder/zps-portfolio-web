export class State {
  sections: Section[] = [];

  addItem(section: Section, item: GroceryItem) {
    section.items.push(item);
  }

  deleteItem(section: Section, item: GroceryItem) {
    section.items.splice(section.items.indexOf(item), 1);
  }

  setMockState() {
    this.sections = [
      new Section('Monday', [
        new GroceryItem(crypto.randomUUID().toString(), 'Chicken'),
        new GroceryItem(crypto.randomUUID().toString(), 'Bread'),
        new GroceryItem(crypto.randomUUID().toString(), 'Cheese', true),
      ]),
      new Section('Breakfast', [
        new GroceryItem(crypto.randomUUID().toString(), 'Yogurt'),
        new GroceryItem(crypto.randomUUID().toString(), 'Granola', true),
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
  id: string;
  name: string;
  isChecked: boolean;

  constructor(id: string, name: string, isChecked: boolean = false) {
    this.id = id;
    this.name = name;
    this.isChecked = isChecked;
  }
}
