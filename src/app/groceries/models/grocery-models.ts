export class GroceryView {
  sections: Section[] = [];
  viewType: ViewType;

  constructor(viewType: ViewType) {
    this.viewType = viewType;
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
  Meal,
  Store,
}
