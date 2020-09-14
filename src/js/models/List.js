import uniqid from 'uniqid'

export default class List{
    constructor(){
        this.items = [];
    }
    add(count,unit,ingredient){
        const item = {
            count,
            unit,
            ingredient,
            id:uniqid()
        }
        this.items.push(item)

    }
    delete(id){
        const toDel = this.items.findIndex(e => e.id === id);
        this.items.splice(toDel,1);     
    }

    update(id,count){
        this.items.find(e => 
            e.id === id ? e.count = count:console.log('lalala'))

    }
}