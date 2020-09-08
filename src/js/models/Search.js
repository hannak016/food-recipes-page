//give the same as api name, and you do not need to give the path (hover to check)
import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";



export default class Search{
    constructor(query){
        this.query = query;
    }
    //query the API
    async getResults(){ 
        try{
            // compare to fetch: it returns automatically  json;and better at error handling.
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);//using ? in order to save it to url
            this.result = res.data.recipes;
            //console.log(this.result);    
        }
        catch(error){
            alert(error);
        } 
    }
}

