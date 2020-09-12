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
        searchView.clrText();//clear
        searchView.clrContent(); //clear 
        searchView.renderSpinner(elements.searchRes);//loader
     
        
        //render the ui(view)
    
        searchView.clrSpinner();
        searchView.renderRes(state.search.result,1,10);
        
        
       
    } 
}


elements.search.addEventListener('submit',e=>{
    e.preventDefault();
    controlResults();
})

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
