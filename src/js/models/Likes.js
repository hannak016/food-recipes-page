export default class Likes{
    constructor(){
        this.likes = [];
    }
    add(id,img,publisher,title){
        const like = {id,img,publisher,title};
        this.likes.push(like);
        //save to localstirage
        this.persistData();
        return like;

    }

    delete(id){
        const toDel = this.likes.findIndex(e => e.id === id);
        this.likes.splice(toDel,1);  
        this.persistData();   
    }

    isLiked(id){
        return this.likes.findIndex(e => e.id === id) !==-1
    }

    persistData(){
        localStorage.setItem('likes',JSON.stringify(this.likes))

    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('likes'))
        if(storage){
            this.likes = storage;
        }
    }
}