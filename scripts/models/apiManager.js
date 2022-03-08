import Photographer from './photographer.js'
import MediaFactory from '../factories/MediaFactory.js'

export default class apiManager {


    static async init(){
        let jsonData = await fetch('/data/photographers.json')
        this.data = await jsonData.json()
    }

    /**
     * Get list of photographer from JSON data
     * @returns {[Photographer]} list of photographers
     */
    static getPhotographers() {
        return this.data.photographers.map(photographer => new Photographer(photographer))
    }

    /**
     * Find photographer by his ID
     * @param {string} id Current photographer ID
     * @returns {Photographer} photographer if found, otherwise undefined
     */
    static getPhotographerById(id){
        return new Photographer(this.data.photographers.find(item => item.id === parseInt(id)))
    }

    static getPhotographerMedia(id){
        return this.data.media.filter(item => item.photographerId === parseInt(id)).map(media => new MediaFactory(media))
    }
}
