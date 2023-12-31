import { ResolveFn } from '@angular/router';
import { Recipe } from '../recipe.model';
import { inject } from '@angular/core';
import RecipeService from '../recipe.service';

export const recipeDetailResolver: ResolveFn<Recipe> = (route, state) => {
  const recipeService = inject(RecipeService);
  console.log(1);
  return recipeService.getById(route.params['id']);
};
