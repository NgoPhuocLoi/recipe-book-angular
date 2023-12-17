import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ShoppingService {
  private ingredientsChanged = new Subject<Ingredient[]>();
  private editedIngredientIndexSubject = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 10),
  ];

  ingredientsState = this.ingredientsChanged.asObservable();
  editedIngredientIndex = this.editedIngredientIndexSubject.asObservable();

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

  updateIngredientByIndex(index: number, updatedIngredient: Ingredient) {
    this.ingredients[index] = updatedIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteItemByIndex(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  editIngredientByIndex(index: number) {
    this.editedIngredientIndexSubject.next(index);
  }

  getIngredientByIndex(index: number) {
    return this.ingredients.at(index);
  }
}
