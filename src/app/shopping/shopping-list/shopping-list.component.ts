import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import ShoppingService from '../shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingService: ShoppingService) {
    this.shoppingService.ingredientsState.subscribe((newIngredients) => {
      this.ingredients = newIngredients;
    });
  }

  onAddIngredient(i: Ingredient) {
    this.shoppingService.addIngredient(i);
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
  }

  onEdit(index: number) {
    this.shoppingService.editIngredientByIndex(index);
  }
}
