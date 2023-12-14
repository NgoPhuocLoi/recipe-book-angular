import { Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipe',
    pathMatch: 'full',
  },
  {
    path: 'recipe',
    component: RecipeComponent,
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
];
