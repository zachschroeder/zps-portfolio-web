import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { map } from 'rxjs';
import {
  AddGroceryItemDto,
  CheckGroceryItemDto,
  DeleteGroceryItemDto,
  GroceryStateDto,
  GroceryView,
  ViewType,
} from './models/grocery-models';

@Injectable({
  providedIn: 'root',
})
export class GroceriesService {
  private http = inject(HttpClient);

  public getGroceries$() {
    const url = `${environment.apiUrl}/groceries`;

    return this.http.get<GroceryStateDto>(url).pipe(
      // groceryStateJsObject is a JavaScript object with no methods, just properties
      // We need to convert it into a usable TypeScript object with methods
      map((groceryStateJsObject) => {
        const mealView = new GroceryView(
          ViewType.Meal,
          groceryStateJsObject.mealView.sections
        );
        const storeView = new GroceryView(
          ViewType.Store,
          groceryStateJsObject.storeView.sections
        );
        return new GroceryStateDto(mealView, storeView);
      })
    );
  }

  public addGroceryItem$(addItemDto: AddGroceryItemDto) {
    const url = `${environment.apiUrl}/grocery-item`;
    return this.http.post<GroceryStateDto>(url, addItemDto);
  }

  public deleteGroceryItem$(deleteItemDto: DeleteGroceryItemDto) {
    const url = `${environment.apiUrl}/grocery-item`;
    return this.http.delete(url, {
      body: deleteItemDto,
    });
  }

  public checkGroceryItem$(checkItemDto: CheckGroceryItemDto) {
    const url = `${environment.apiUrl}/grocery-item`;
    return this.http.put(url, checkItemDto);
  }

  public deleteAllGroceries$() {
    const url = `${environment.apiUrl}/groceries`;
    return this.http.delete(url);
  }
}
