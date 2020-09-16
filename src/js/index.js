//controller file
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as ListView from './views/ListView';
import * as LikeView from './views/LikeView';

import { elements } from './views/base';
import { async } from 'regenerator-runtime';


let state = {};


/**
 *SEARCH FIELD
 */

//controller
async function searchResults(){
    const query = searchView.searchRes();

    if(query){

        try{
        //search request
        state.search = new Search(query);
        await state.search.getResults();



        //prepare the ui(view)
        searchView.clrText();//clear
        searchView.clrContent(); //clear 
        searchView.renderSpinner(elements.searchRes);//loader
     
        
        //render the ui(view)
        searchView.clrSpinner();
        searchView.renderRes(state.search.result);
        }
        catch(err){
            alert('failed to get search results')
        }
        
        
       
    } 
}

//trigger
elements.search.addEventListener('submit',e=>{
    e.preventDefault();
    searchResults();
})
elements.searchResPages.addEventListener('click',event =>{
    
    //console.log(event.target);
    //you could see: button span(text like'Page 2') and icon are seperate elements, you dont know then in this case which element you should attach the eventlistener to, or: you add thre  times to each of the three elements
    //solution: event delegation

    //closest(): a function for event delegation
    const btn = event.target.closest( '.btn-inline')
    //console.log(btn); now whereever you click = btn;
    if (btn) {
        //you add infos under data---blabla in html element, and get it by 'dataset.blablabla)(it is still a string)
        const gotoPage = parseInt(btn.dataset.goto,10);
        //otherwise you got all btns
        searchView.clrContent();
        searchView.renderRes(state.search.result,gotoPage);
        console.log(gotoPage);

    }

}
)






/**
 * SHOPPING LIST
 */

// controller
const controlShoppingList = () => {
    if(!state.list){
        state.list = new List();
    }
    state.recipe.ingredients.forEach(el => {
        const item = state.list.add(el.count,el.unit,el.ingredient);
        ListView.renderItem(item);

    })
}

// trigger
elements.shopping.addEventListener('click',e => {
    //dateset: defeniere s selber so dass du darauf zugreifen kannst  
    // select so
    const id = event.target.closest( '.shopping__item').dataset.itemid;

    // das Element und alle ihre Kinder: suche mal in html,ob es gekaspelte divs gibt
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        ListView.deleteItem(id);
        state.list.delete(id);
    }
    // keine gekaspelte divs 
    else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value,10);
        state.list.update(id,val);
    }


} )
/**
 * LIKES
 */
//storage
window.addEventListener('load',()=>{
    state.likes = new Likes();
    state.likes.readStorage();
    LikeView.renderLikesList(state.likes.likes.length);
    state.likes.likes.forEach(like=>{
        LikeView.renderLikesContent(like);

    })


})


//controller
const controlLikes = () => {
    if(!state.likes){
        state.likes = new Likes();
    }
    //if NOT liked yet

    if(!state.likes.isLiked(state.recipe.id)){
       const newLike = 
       state.likes.add(state.recipe.id,state.recipe.img,state.recipe.publisher,state.recipe.title)

       LikeView.renderHeart(true);
       console.log(state.likes);

       LikeView.renderLikesContent(newLike)
    }
    
    //if already liked
    else {
        state.likes.delete(state.recipe.id);
        console.log(state.likes);
        LikeView.renderHeart(false);
        LikeView.deleteLikesContent(state.recipe.id)

    }

    LikeView.renderLikesList(state.likes.likes.length);
  
}







/**
 * RECIPE RESULTS
 */


// controller
const controlRecipe = async () => {
    // replace is a string method
    const id = window.location.hash.replace('#','')
    //always add try catch to ajax code
    if(id){
        try{
            state.recipe = new Recipe(id);
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            recipeView.clrContent();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
                );
          
        }
        catch(e){
            alert('can not get the recipe!!')
        }
        
    }

}

//trigger
 window.addEventListener('hashchange',controlRecipe) 
 window.addEventListener('load',controlRecipe) 


 elements.recipe.addEventListener('click',e => {


    //'-' 
    //if your target is the btn or any children of this button: event delegation again
    if(e.target.matches('.btn-minus, .btn-minus *')){
        //model
        if(state.recipe.servings >1){
            state.recipe.updateServings('-');
            recipeView.updateServings(state.recipe);
        }
       
    }

    //'+'   
    else if(e.target.matches('.btn-add, .btn-add *')){
        state.recipe.updateServings('+');
        recipeView.updateServings(state.recipe);
    }

    ///////since the addToShoppingList button and the like button are both in recipe so triggers are put here



    //shoppingList trigger
    else if(e.target.matches('.recipe_btn_add, .recipe_btn_add *')){
        controlShoppingList();
    }

    //Likes trigger
    else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLikes();
    }

    
    
 });








 
 