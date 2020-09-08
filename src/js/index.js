//controller file
import sth from './models/Search';
import { add, multiply, ID } from './views/searchView';
//give the same as api name, and you do not need to give the path 
//import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";


//query the API
async function getResults(query){
    //const proxy =  'https://cors-anywhere.herokuapp.com/';
    
    //try{
       // compare to fetch: it returns automatically  json;and better at error handling.
        /* const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`); */
       /* search.js
        const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`); */
        /* const recipes = res.data.recipes;
        console.log(recipes); */
        //console.log(res);
    //}
    /* catch(error){
        alert(error);
    }  */ 
}

//getResults('pizza');
