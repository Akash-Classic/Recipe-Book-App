import { ShoppingListService } from './../shopping-list.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  // @ViewChild('nameInput') nameInputRef!: ElementRef;
  // @ViewChild('amountInput') amountInputRef!: ElementRef;

  @ViewChild('f')  slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private shoppinglistService: ShoppingListService) { }

  ngOnInit(): void {
   this.subscription = this.shoppinglistService.startedEditing.subscribe(
     (index: number) => {
       this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppinglistService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
     }
   )
  }
    
  onSubmit(form: NgForm){
      //  const ingName = this.nameInputRef.nativeElement.value;
      //  const ingAmount = this.amountInputRef.nativeElement.value;
      const value = form.value;
       const newIngredient = new Ingredient(value.name, value.amount);
       if(this.editMode){
         this.shoppinglistService.updateIngredient(this.editedItemIndex, newIngredient)
       }else{
        this.shoppinglistService.addIngredient(newIngredient);
       }
       this.editMode = false;
       form.reset();
      
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppinglistService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
