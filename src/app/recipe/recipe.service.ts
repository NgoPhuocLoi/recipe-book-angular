import { EventEmitter, Injectable, inject } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export default class RecipeService {
  private RECIPE_URL =
    'https://learn-angular-d8a81-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json';
  private recipesStateSubject = new Subject<Recipe[]>();
  recipesState = this.recipesStateSubject.asObservable();
  private http = inject(HttpClient);

  public recipes: Recipe[] = [];

  getRecipes() {
    this.http.get(this.RECIPE_URL).subscribe((res) => {
      for (let key in res) {
        console.log(key);
        this.recipes.push(res[key]);
      }
      this.recipesStateSubject.next(this.recipes);
    });
  }

  addRecipe(recipe: Recipe) {
    this.http.post(this.RECIPE_URL, recipe).subscribe((res) => {
      console.log(res);
      this.recipes.push(recipe);
      this.recipesStateSubject.next(this.recipes);
    });
  }

  getById(id: number) {
    return this.recipes.find((r) => r.id === id);
  }

  updateRecipeById(id: number, updatedRecipe: Recipe) {
    this.recipes = this.recipes.map((r) => (r.id === id ? updatedRecipe : r));
    this.recipesStateSubject.next(this.recipes);
  }

  deleteById(id: number) {
    this.recipes = this.recipes.filter((r) => r.id !== id);
    this.recipesStateSubject.next(this.recipes);
  }
}
