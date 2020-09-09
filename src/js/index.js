//controller file
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

let state = {};


async function controlResults(){
    const query = searchView.searchRes();

    if(query){
        //search request
        state.search = new Search(query);
        await state.search.getResults();

        //prepare the ui(view)

        //render the ui(view)
        console.log(state.search.result);
    } 
}


elements.search.addEventListener('submit',e=>{
    e.preventDefault();
    controlResults();
})

