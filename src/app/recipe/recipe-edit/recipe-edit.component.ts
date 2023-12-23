import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import RecipeService from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  editMode = false;
  editedRecipe: Recipe;

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.editedRecipe = this.recipeService.getById(param['id']);
      this.editMode = !!param['id'];
    });
    this.initForm();
  }

  private initForm() {
    const recipeData = {
      name: ['', Validators.required],
      imagePath: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.formBuilder.array<FormGroup>([]),
    };
    if (this.editMode) {
      recipeData.name[0] = this.editedRecipe.name;
      recipeData.imagePath[0] = this.editedRecipe.imagePath;
      recipeData.description[0] = this.editedRecipe.description;
      recipeData.ingredients = this.formBuilder.array<FormGroup>(
        this.editedRecipe.ingredients.map((ingredient, index) =>
          this.formBuilder.group({
            name: [ingredient.name, Validators.required],
            amount: [
              ingredient.amount,
              [Validators.required, Validators.min(1)],
            ],
          })
        )
      );
    }
    this.recipeForm = this.formBuilder.group(recipeData);
  }

  get ingredientControls() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onSubmit() {
    const recipe = new Recipe(
      // this.recipeService.recipes.length + 1,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients.map(
        (i: { name: string; amount: number }) =>
          new Ingredient(i.name, i.amount)
      )
    );

    if (this.editMode) {
      recipe.id = this.editedRecipe.id;
      this.updateRecipe(this.editedRecipe.id, recipe);
      console.log(recipe);
    } else {
      this.addRecipe(recipe);
    }

    this.recipeForm.reset();
    this.router.navigate(['..'], {
      relativeTo: this.route,
    });
  }

  private addRecipe(recipe: Recipe) {
    this.recipeService.addRecipe(recipe);
  }

  private updateRecipe(id: string, updatedRecipe: Recipe) {
    this.recipeService.updateRecipeById(id, updatedRecipe);
    this.editMode = false;
  }

  onAddIngredient() {
    this.ingredientControls.push(
      this.formBuilder.group({
        name: ['', Validators.required],
        amount: ['', [Validators.required, Validators.min(1)]],
      })
    );
  }

  onDeleteIngredient(index: number) {
    this.ingredientControls.removeAt(index);
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['..'], {
      relativeTo: this.route,
    });
  }
}
