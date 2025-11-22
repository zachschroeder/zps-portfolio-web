import { GroceryItem, GroceryView, Section, ViewType } from './grocery-models';
import { GroceriesService } from '../groceries.service';
import { computed, inject, signal } from '@angular/core';

export class GroceryState {
  private service = inject(GroceriesService);

  mealView = signal(new GroceryView(ViewType.Meal));
  storeView = signal(new GroceryView(ViewType.Store));

  isMealViewSelected = signal(true);
  selectedView = computed(() =>
    this.isMealViewSelected() ? this.mealView() : this.storeView()
  );

  addSection(sectionName: string) {
    this.selectedView().sections.push(new Section(sectionName, []));
  }

  addItem(section: Section, item: GroceryItem) {
    section.items.push(item);
  }

  deleteItem(item: GroceryItem) {
    this.deleteItemFromView(item, this.mealView());
    this.deleteItemFromView(item, this.storeView());
  }

  private deleteItemFromView(item: GroceryItem, view: GroceryView) {
    for (const section of view.sections) {
      const itemIndex = section.items.indexOf(item);

      if (itemIndex >= 0) {
        section.items.splice(itemIndex, 1);
        return;
      }
    }
  }

  refresh() {
    this.service.getGroceries$().subscribe((groceries) => {
      this.mealView.set(groceries.mealView);
      this.storeView.set(groceries.storeView);
    });
  }

  selectMealView() {
    this.isMealViewSelected.set(true);
  }

  selectStoreView() {
    this.isMealViewSelected.set(false);
  }
}
