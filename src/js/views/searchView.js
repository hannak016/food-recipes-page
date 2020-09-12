import  { elements } from './base';
//handle title length
//a private function 
// 17 as initialization, changable

const limitTitleLen = (title,limit = 17) => {
    const newTitle = [];
    if(title.length >= limit){
        title.split(' ').reduce((acc,word) => {
            newTitle.push(word);
            return acc + word

        },0)
        return `${newTitle.join(' ')}...`
    }
    else {
        return title;
    }

}


const renderElem = (e) => {
    //add ui<li>
    const res = 
    `<li>
    <a class="results__link" href="#${e.recipe_id}">
    <figure class="results__fig">
        <img src="${e.image_url}" alt="${e.titel}">
    </figure>
    <div class="results__data">
        <h4 class="results__name">${limitTitleLen(e.title)}</h4>
        <p class="results__author">${e.publisher}</p>
    </div>
    </a>
    </li>`
    elements.resList.insertAdjacentHTML("beforeend",res)

};

export const searchRes = () => elements.searchInput.value;
export const clrContent = () => {
    elements.resList.innerHTML='';
    //clear the buttons
    elements.searchResPages.innerHTML='';
};

export const clrText = () => {
    elements.searchInput.value='';
};
//type:prev/next
const getBtn = (page,type) => `
    <button class="btn-inline results__btn--${type}" data-goto= ${type==='prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ?'left':'right'}"></use>
        </svg>

    </button>

`
const renderBtns = (page, numPages, resPerPage) => {
    const pages = Math.ceil(numPages/resPerPage);
    let button;
    if ( page === 1 && pages > 1 ){
        //next
        button = getBtn(page,'next');
        console.log(button)

    }else if(page < pages && pages > 1 ){
        //both
        button = `
        ${getBtn(page,'prev')}
        ${getBtn(page,'next')}
        `
    }
    else if( page === pages && pages > 1 ){
        //prev
        button = getBtn(page,'prev')

    }
    elements.searchResPages.insertAdjacentHTML("afterbegin",button)
}

export const renderRes = (results,page=1,resPerPage=10) => {
    const start = resPerPage * (page - 1);
    const end = start + resPerPage;
    //slice does not incude the end but the start inthis case showing 0-9 =10results in total
    results.slice(start,end).forEach(el => renderElem(el)); 
    renderBtns(page,results.length,resPerPage); 
};

export const renderSpinner = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin",loader) ;
    console.log('foo') 
}

export const clrSpinner = () => {         
    const loader = document.querySelector(".loader") 
    console.log(loader) 
    if(loader){
        loader.parentElement.removeChild(loader) 
        console.log('haha')    
    }
  
}