import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { Recipe } from '../recipes/recipe.model';
import { map, take, tap, exhaustMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{
      constructor(private http: HttpClient,
                  private recipeService: RecipeService,
                  private authService: AuthService){}

    storeRecipe(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-project-fa753-default-rtdb.firebaseio.com/recipes.json', 
        recipes).subscribe(
            response => {
                console.log(response);
            }
        );
    }  

    fetchRecipe(){
      
    return this.http.get<Recipe[]>('https://recipe-book-project-fa753-default-rtdb.firebaseio.com/recipes.json'
               
        ).pipe(
        
        map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            })
        }), tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }))
       
}
}