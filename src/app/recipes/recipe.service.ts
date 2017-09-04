import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('A Giant Burger',
               'This is the best burger in the world!',
               'https://upload.wikimedia.org/wikipedia/commons/8/80/Guacamole_Pepper-Jack_Burger.jpg',
               [
                 new Ingredient('Buns', 2),
                 new Ingredient('Meat', 1),
                 new Ingredient('Cheese', 30),
                 new Ingredient('French Fries', 100)
               ]),
    new Recipe('Classic Hot Dog',
               'Just a boring weiner...',
               'http://www.publicdomainpictures.net/pictures/130000/velka/hotdog-mustard-only.jpg',
               [
                 new Ingredient('Bun', 1),
                 new Ingredient('Weiner', 1),
                 new Ingredient('Honey Mustard', 1)
               ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
