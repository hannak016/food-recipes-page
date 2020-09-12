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


}