import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class RecipeService {
  private recipesStateSubject = new Subject<Recipe[]>();
  recipesState = this.recipesStateSubject.asObservable();

  public recipes: Recipe[] = [
    new Recipe(
      1,
      'Recipe 1',
      'Description of recipe 1',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
      [
        new Ingredient('Ingredient 1', 10),
        new Ingredient('Ingredient 2', 5),
        new Ingredient('Ingredient 3', 8),
      ]
    ),
    new Recipe(
      2,
      'Recipe 2',
      'Description of recipe 2',
      'https://www.simplyrecipes.com/thmb/KRw_r32s4gQeOX-d07NWY1OlOFk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg'
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesStateSubject.next(this.recipes);
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
