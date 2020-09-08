//controller file
import Search from './models/Search';
import { add, multiply, ID } from './views/searchView';
/* import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime"; */
let state = {};


async function controlResults(query){
    //const query = 'pizza';

    if(query){
        //search request
        
      
        //get data 
        state.search = new Search(query);
        await state.search.getResults();

        //prepare the ui(view)

        //render the ui(view)
        console.log(state.search);
    } 
}


document.querySelector(".search").addEventListener('submit',e=>{
    e.preventDefault();
    const query = document.querySelector(".search__field").value;
    console.log(query);
    controlResults(query);
})

