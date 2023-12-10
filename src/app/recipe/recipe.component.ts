import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import RecipeService from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  activeRecipe: Recipe = null;

  constructor(private recipeService: RecipeService) {
    this.recipeService.activeRecipeUpdated.subscribe((recipe) => {
      this.activeRecipe = recipe;
    });
  }
}
