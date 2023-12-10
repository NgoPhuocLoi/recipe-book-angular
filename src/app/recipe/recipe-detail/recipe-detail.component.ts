import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import RecipeService from '../recipe.service';
import ShoppingService from '../../shopping/shopping.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  @Input() activeRecipe: Recipe;

  constructor(private shoppingService: ShoppingService) {}

  onAddIngredientsToShoppingList() {
    this.shoppingService.addIngredients(this.activeRecipe.ingredients);
  }
}
