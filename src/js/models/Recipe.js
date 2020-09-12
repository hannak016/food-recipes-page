import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";


export default class Recipe{
    constructor(id){
        this.id = id;
    }
    async getRecipe(){
        try{
        const recipes = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
        this.img = recipes.data.recipe.image_url;
        this.publisher = recipes.data.recipe.publisher;
        this.ingredients = recipes.data.recipe.ingredients;
        this.title = recipes.data.recipe.title;
        this.time = 15 * Math.ceil(this.ingredients.length/3);
        this.servings = 4;
        }
        catch(error){
            alert('oppppppps, something went wrong')
        }    
    };
    parseIngredients(){
        //seperate the ingredietns to three part :count unit and ingredients
        const unitsLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];

        const newIngredients = this.ingredients.map(el=>{
            let ingredients = el.toLowerCase();
            unitsLong.forEach((unit,index)=>{
                ingredients = ingredients.replace(unit,unitsShort[index])
            })
            ingredients = ingredients. replace(/[{()}]/g, '');

            return ingredients;

        })

        this.ingredients = newIngredients;
        

    }


}