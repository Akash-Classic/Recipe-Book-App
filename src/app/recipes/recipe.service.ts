import { ShoppingListService } from './../shopping-list/shopping-list.service';
import {  Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
      recipeChanged = new Subject<Recipe[]>();
    
//  private recipes: Recipe[] = [
//         new Recipe('A Pizza', 'This is a tasty pizza',
//         'https://img.onmanorama.com/content/dam/mm/en/food/features/images/2021/10/17/pizza.jpg',
//         [
//             new Ingredient('Tomato',1),
//             new Ingredient('Fine-flour',200),
//             new Ingredient('Onion',1),
//             new Ingredient('Chease',10),
//             new Ingredient('Capsicum',1)
//         ]),
       
//         new Recipe('Samosa', 'This is tasty samosa',
//         'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe-480x270.jpg',
//         [
//             new Ingredient('Fine-flour',100),
//             new Ingredient('Chutney',50),
//             new Ingredient('Potato', 500)
//         ]),
          
//       ];

    private recipes: Recipe[] = [];

         constructor(private shoppingListService: ShoppingListService){

         }

         setRecipes(recipes: Recipe[]){
             this.recipes = recipes;
             this.recipeChanged.next(this.recipes.slice());
         }

      getRecipes(){
             return this.recipes.slice();
      }
 
      getRecipe(index: number){
            return this.recipes[index];
      } 

      addIngredientToShoppingList(ingredients: Ingredient[]){
            this.shoppingListService.addIngredientsToShopList(ingredients);
      }

      addRecipe(recipe: Recipe){
           this.recipes.push(recipe);
           this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
           this.recipes[index] = newRecipe;
           this.recipeChanged.next(this.recipes.slice())
      }

      deleteRecipe(index: number){
           this.recipes.splice(index, 1);
           this.recipeChanged.next(this.recipes.slice());
      }
}