import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  activeRecipe: Recipe = null;

  onChangeActiveRecipe(recipe: Recipe) {
    this.activeRecipe = recipe;
  }
}
