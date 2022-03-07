import Photographer from './photographer.js'
import Media from './media.js'

export default class apiManager {


    static async init(){
        let jsonData = await fetch('/data/photographers.json')
        this.data = await jsonData.json()
    }

    static getPhotographers() {
        return this.data.photographers.map(photographer => new Photographer(photographer))
    }

    static getPhotographerById(id){
        return new Photographer(this.data.photographers.find(item => item.id === id))
    }

    static getPhotographerMedia(id){
        return new Media (this.data.media.filter(item => item.photographerId === id))
    }
}
