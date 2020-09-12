//controller file
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements } from './views/base';
import { async } from 'regenerator-runtime';


let state = {};


async function controlResults(){
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

//search controller
elements.search.addEventListener('submit',e=>{
    e.preventDefault();
    controlResults();
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

//recipe controller
const controlRecipe = async () => {
    // replace is a string method
    const id = window.location.hash.replace('#','')
    //always add try catch to ajax code
    if(id){
        try{
            state.recipe = new Recipe(id);
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            console.log(state.recipe);
          
        }
        catch(e){
            alert('can not get the recipe!!')
        }
        
    }

}
 window.addEventListener('hashchange',controlRecipe) 
 window.addEventListener('load',controlRecipe) 


 
 