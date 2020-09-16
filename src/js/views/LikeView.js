import { elements } from "./base"

export const renderHeart = isLiked => {
    const heartStr = isLiked? '-heart':'-heart-outlined'
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#icon${heartStr}`)


/*     <button class="recipe__love">
    <svg class="header__likes">
        <use href="img/icons.svg#icon-heart-outlined"></use>
    </svg>
</button> */

}

export const renderLikesList = (numLikes) => {
    elements.likesMenu.style.visiblity = numLikes > 0?'visible':'hidden';
}

export const renderLikesContent =(like)=> {

    const markup =`

    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                    <p class="likes__author">${like.publisher}</p>
            </div>
        </a>
    </li>
    `  
    elements.likeList.insertAdjacentHTML("beforeend",markup);
                    
}

export const deleteLikesContent = id =>{
    const el = document.querySelector(`.likes__link[href*=${id}]`).parentElement
    
    if(el){
        el.parentElement.removeChild(el);
    }

}






