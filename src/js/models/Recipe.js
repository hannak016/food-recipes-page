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
        this.url = recipes.data.recipe.source_url;
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
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit,index)=>{
                ingredient = ingredient.replace(unit,unitsShort[index])
            })
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(elem => {
               if(unitsShort.includes(elem)){
                   return elem;
               } 
            })



            let objIng;
            //if it has an unit 
            if(unitIndex >- 1){
                //todo
                let count;
                //slice such vom Anfang bis auf du dein unit triffst
                const arrCount = arrIng.slice(0,unitIndex);
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-','+'));
                }
                else{
                
                //eval:turn the string to js code zB: eval('4+1/2')=>4.5
                    count = eval(arrIng.slice(0,unitIndex).join('+'));
                }
                objIng = {
                    count,
                    unit:arrIng[unitIndex],
                    ingredient:arrIng.slice(unitIndex+1).join(' ')

                }

            }else if(parseInt(arrIng[0],10)){
                objIng = {
                    count:parseInt(arrIng[0],10),
                    unit:'',
                    ingredient:arrIng.slice(1).join(' ')
                }
            }else if(unitIndex===-1){
                //no unit
                objIng = {
                    count:1,
                    unit:'',
                    ingredient
                }
            }
            return objIng; 
        })

        this.ingredients = newIngredients;
    }
    updateServings(type){
        //from right to left
        const newServings = type ==='+'?this.servings+1:this.servings-1;

        this.ingredients.forEach(ing =>
            ing.count *= newServings/this.servings )

        this.servings = newServings;

    }


}