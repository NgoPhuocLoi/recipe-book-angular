import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import ShoppingService from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f', { static: false }) ingredientForm: NgForm;

  editMode = false;
  editedItemIndex: number;

  private shoppingService = inject(ShoppingService);

  ngOnInit(): void {
    this.shoppingService.editedIngredientIndex.subscribe((index) => {
      this.editMode = true;
      this.editedItemIndex = index;
      const editedItem = this.shoppingService.getIngredientByIndex(index);
      this.ingredientForm.setValue({
        name: editedItem.name,
        amount: editedItem.amount,
      });
    });
  }

  onIngredientFormSubmit() {
    this.editMode ? this.updateItem() : this.addItem();
    this.ingredientForm.reset();
  }

  addItem() {
    this.shoppingService.addIngredient(
      new Ingredient(
        this.ingredientForm.value.name,
        this.ingredientForm.value.amount
      )
    );
  }

  updateItem() {
    this.shoppingService.updateIngredientByIndex(
      this.editedItemIndex,
      new Ingredient(
        this.ingredientForm.value.name,
        this.ingredientForm.value.amount
      )
    );
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteItemByIndex(this.editedItemIndex);
    this.ingredientForm.reset();
    this.editMode = false;
  }
}
