import {
  AddGroceryItemDto,
  DeleteGroceryItemDto,
  GroceryItem,
  GroceryView,
  Section,
  ViewType,
} from './grocery-models';
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
    let addItemDto: AddGroceryItemDto;
    if (this.isMealViewSelected())
      addItemDto = new AddGroceryItemDto(item.id, item.name, section.name, '');
    else
      addItemDto = new AddGroceryItemDto(item.id, item.name, '', section.name);

    this.service.addGroceryItem$(addItemDto).subscribe();

    section.items.push(item);
  }

  deleteItem(item: GroceryItem) {
    this.service
      .deleteGroceryItem$(new DeleteGroceryItemDto(item.id))
      .subscribe();

    this.deleteItemFromView(item, this.mealView());
    this.deleteItemFromView(item, this.storeView());
  }

  private deleteItemFromView(item: GroceryItem, view: GroceryView) {
    for (const section of view.sections) {
      const itemIndex = section.items.findIndex((i) => i.id === item.id);

      if (itemIndex >= 0) {
        section.items.splice(itemIndex, 1);
        return;
      }
    }
  }

  checkItem(item: GroceryItem) {
    this.checkItemInView(item, this.mealView());
    this.checkItemInView(item, this.storeView());
  }

  private checkItemInView(item: GroceryItem, view: GroceryView) {
    for (const section of view.sections) {
      const foundItem = section.items.find((i) => i.id === item.id);

      if (foundItem) {
        foundItem.isChecked = true;
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
