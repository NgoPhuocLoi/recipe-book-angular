import { Component, Input, OnInit, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import RecipeService from '../recipe.service';
import ShoppingService from '../../shopping/shopping.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  recipe: Recipe;

  private route = inject(ActivatedRoute);
  private shoppingService = inject(ShoppingService);

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.recipe = data['recipe'];
    });
  }

  onAddIngredientsToShoppingList() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }
}
