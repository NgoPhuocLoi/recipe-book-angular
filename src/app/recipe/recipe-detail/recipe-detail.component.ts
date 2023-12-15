import { Component, Input, OnInit, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import RecipeService from '../recipe.service';
import ShoppingService from '../../shopping/shopping.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  recipe: Recipe;

  private route = inject(ActivatedRoute);
  private shoppingService = inject(ShoppingService);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.recipe = data['recipe'];
    });
  }

  onAddIngredientsToShoppingList() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
    this.router.navigateByUrl('/shopping-list');
  }
}
