export class GroceryStateDto {
  mealView: GroceryView;
  storeView: GroceryView;

  constructor(mealView: GroceryView, storeView: GroceryView) {
    this.mealView = mealView;
    this.storeView = storeView;
  }
}

export class AddGroceryItemDto {
  id: string;
  name: string;
  mealSection: string;
  storeSection: string;

  constructor(
    id: string,
    name: string,
    mealSection: string,
    storeSection: string
  ) {
    this.id = id;
    this.name = name;
    this.mealSection = mealSection;
    this.storeSection = storeSection;
  }
}

export class DeleteGroceryItemDto {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class GroceryView {
  viewType: ViewType;
  sections: Section[];

  constructor(viewType: ViewType, sections: Section[] = []) {
    this.viewType = viewType;
    this.sections = sections;
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
