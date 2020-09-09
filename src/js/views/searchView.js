import  { elements } from './base';

export const searchRes = () => elements.searchInput.value;
export const clrContent = () => {
    elements.resList.innerHTML='';
};
export const clrText = () => {
    elements.searchInput.value='';
};
//handle title length
//a private function 
// 17 as initialization, changable

const limitTitleLen = (title,limit = 17) => {
    const newTitle = [];
    if(title.length >= limit){
        title.split('').reduce((acc,word) => {
            newTitle.push(word);
            return acc + word

        },0)
        return `${newTitle.join('')}...`
    }
    else {
        return title;
    }

}


const renderElem = (e) => {
    //add ui<li>
    const res = 
    `<li>
    <a class="results__link" href="${e.recipe_id}">
    <figure class="results__fig">
        <img src="${e.image_url}" alt="${e.titel}">
    </figure>
    <div class="results__data">
        <h4 class="results__name">"${limitTitleLen(e.title)}"</h4>
        <p class="results__author">"${e.publisher}"</p>
    </div>
    </a>
    </li>`
    elements.resList.insertAdjacentHTML("beforeend",res)

    console.log(e.recipe_id)
};

export const renderRes = (results) => {
    results.forEach(el => renderElem(el));  
};