export default class Likes{
    constructor(){
        this.likes = [];
    }
    add(id,img,author,title){
        const like = {id,img,author,title};
        this.likes.push(like);

    }

    delete(id){
        const toDel = this.likes.findIndex(e => e.id === id);
        this.likes.splice(toDel,1);     
    }

    isLiked(id){
        return this.likes.findIndex(e => e.id === id) !==-1
    }
}