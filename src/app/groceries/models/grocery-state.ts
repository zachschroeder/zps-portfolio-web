import { GroceryItem, GroceryView, Section, ViewType } from './grocery-models';

export class GroceryState {
  mealView = new GroceryView(ViewType.Meal);
  storeView = new GroceryView(ViewType.Store);

  selectedView = this.mealView;
  isMealViewSelected = true;

  addSection(sectionName: string) {
    this.selectedView.sections.push(new Section(sectionName, []));
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

  selectMealView() {
    this.isMealViewSelected = true;
    this.selectedView = this.mealView;
  }

  selectStoreView() {
    this.isMealViewSelected = false;
    this.selectedView = this.storeView;
  }

  setMockState() {
    const mockItems: GroceryItem[] = [
      new GroceryItem(crypto.randomUUID().toString(), 'Chicken'),
      new GroceryItem(crypto.randomUUID().toString(), 'Bread'),
      new GroceryItem(crypto.randomUUID().toString(), 'Cheese', true),
      new GroceryItem(crypto.randomUUID().toString(), 'Yogurt'),
      new GroceryItem(crypto.randomUUID().toString(), 'Granola', true),
    ];

    this.mealView.sections = [
      new Section('Monday', [mockItems[0], mockItems[1], mockItems[2]]),
      new Section('Breakfast', [mockItems[3], mockItems[4]]),
    ];
    this.storeView.sections = [
      new Section('Deli', [mockItems[0]]),
      new Section('Grains', [mockItems[1], mockItems[4]]),
      new Section('Dairy', [mockItems[2], mockItems[3]]),
    ];
  }
}
