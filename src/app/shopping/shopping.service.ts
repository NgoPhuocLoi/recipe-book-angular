import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ShoppingService {
  private ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10),
  ];

  ingredientsState = this.ingredientsChanged.asObservable();

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(i: Ingredient) {
    this.ingredients.push(i);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
