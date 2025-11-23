import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private headers = new HttpHeaders().set(
    'x-functions-key',
    environment.apiKey
  );
  private http = inject(HttpClient);

  public getGroceries$() {
    const url = `${environment.apiUrl}/groceries`;

    return this.http
      .get<GroceryStateDto>(url, {
        headers: this.headers,
      })
      .pipe(
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

    return this.http.post<GroceryStateDto>(url, addItemDto, {
      headers: this.headers,
    });
  }

  public deleteGroceryItem$(deleteItemDto: DeleteGroceryItemDto) {
    const url = `${environment.apiUrl}/grocery-item`;

    return this.http.delete(url, {
      headers: this.headers,
      body: deleteItemDto,
    });
  }

  public checkGroceryItem$(checkItemDto: CheckGroceryItemDto) {
    const url = `${environment.apiUrl}/grocery-item`;

    return this.http.put(url, checkItemDto, {
      headers: this.headers,
    });
  }
}
