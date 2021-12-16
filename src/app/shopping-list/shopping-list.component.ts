import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private igChangeSub!: Subscription;

  constructor(private shoppinglistSerive: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppinglistSerive.getIngredients();
   this.igChangeSub =  this.shoppinglistSerive.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
           this.ingredients = ingredients;
      }
    )
  }

  ngOnDestroy(): void {
      this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number){
          this.shoppinglistSerive.startedEditing.next(index);
  }
}
