import  { elements } from './base';

export const searchRes = () => elements.searchInput.value;
export const clrContent = () => {
    elements.resList.innerHTML='';
};
export const clrText = () => {
    elements.searchInput.value='';
};

const renderElem = (e) => {
    //add ui<li>
    const res = 
    `<li>
    <a class="results__link" href="${e.recipe_id}">
    <figure class="results__fig">
        <img src="${e.image_url}" alt="${e.titel}">
    </figure>
    <div class="results__data">
        <h4 class="results__name">"${e.title}"</h4>
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