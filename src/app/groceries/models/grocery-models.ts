export class State {
  sections: Section[] = [];
  viewType: ViewType;

  constructor(viewType: ViewType) {
    this.viewType = viewType;
  }

  addItem(section: Section, item: GroceryItem) {
    section.items.push(item);
  }

  deleteItem(section: Section, item: GroceryItem) {
    section.items.splice(section.items.indexOf(item), 1);
  }

  refresh() {
    this.setMockState();
  }

  setMockState() {
    const mockItems: GroceryItem[] = [
      new GroceryItem(crypto.randomUUID().toString(), 'Chicken'),
      new GroceryItem(crypto.randomUUID().toString(), 'Bread'),
      new GroceryItem(crypto.randomUUID().toString(), 'Cheese', true),
      new GroceryItem(crypto.randomUUID().toString(), 'Yogurt'),
      new GroceryItem(crypto.randomUUID().toString(), 'Granola', true),
    ];

    if (this.viewType === ViewType.Meal) {
      this.sections = [
        new Section('Monday', [mockItems[0], mockItems[1], mockItems[2]]),
        new Section('Breakfast', [mockItems[3], mockItems[4]]),
      ];
    } else {
      this.sections = [
        new Section('Deli', [mockItems[0]]),
        new Section('Grains', [mockItems[1], mockItems[4]]),
        new Section('Dairy', [mockItems[2], mockItems[3]]),
      ];
    }
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

export enum ViewType {
  Undefined,
  Meal,
  Store,
}
