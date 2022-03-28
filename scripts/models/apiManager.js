import Photographer from './photographer.js'
import MediaFactory from '../factories/MediaFactory.js'

export default class apiManager {

    constructor(){
        this.data = {}
        this.photographersInfo = []
        this.currentPhotographerInfo = {}
        this.currentPhotographerMedia = []
        this.currentPhotographerTotalLikes = 0
    }

    static async init(){
        let jsonData = await fetch('/data/photographers.json')
        this.data = await jsonData.json()
    }

    static setPhotographersInfo(){
        this.photographersInfo = this.data.photographers.map(photographer => photographer)
    }

    static setCurrentPhotographerInfo(id){
        this.currentPhotographerInfo = this.photographersInfo.find(item => item.id === parseInt(id))
    }

    static setCurrentPhotographerMedia(id){
        this.currentPhotographerMedia = this.data.media.filter(item => item.photographerId === parseInt(id)).map(item => ({...item, isClicked: false}))
    }

    static setCurrentPhotographerTotalLikes(){
        this.currentPhotographerTotalLikes = this.currentPhotographerMedia.map(media => media.likes).reduce((acc, val) => acc + val)
    }

    static getClickedMedia(id){
        return this.currentPhotographerMedia.find(item => item.id === id)
    }

    static manageLikesState(id){
        const selectedMedia = this.getClickedMedia(id)
        if(!selectedMedia.isClicked){
            selectedMedia.isClicked = true
            selectedMedia.likes++
            this.currentPhotographerTotalLikes++
        }
    }

    /**
     * Get list of photographer from JSON data
     * @returns {[Photographer]} list of photographers
     */
    static displayPhotographersInfo() {
        return this.photographersInfo.map(photographer => new Photographer(photographer))
    }

    /**
     * Find photographer by his ID
     * @returns {Photographer} photographer if found, otherwise undefined
     */
    static displayCurrentPhotographerInfo(){
        return new Photographer(this.currentPhotographerInfo)
    }

    static displayCurrentPhotographerMediaFilteredByPopularity(){
        return this.currentPhotographerMedia.sort((a, b) => b.likes - a.likes).map(media => new MediaFactory(media))
    }

    static displayCurrentPhotographerMediaFilteredByDate(){
        return this.currentPhotographerMedia.sort((a, b) => {
            let dateA = new Date(a.date)
            let dateB = new Date(b.date)
            return dateB - dateA
        }).map(media => new MediaFactory(media))
    }

    static displayCurrentPhotographerMediaFilteredByTitle(){

        return this.currentPhotographerMedia.sort((a, b) => {
            let nameA = a.title.toLowerCase()
            let nameB = b.title.toLowerCase()
        
            if (nameA < nameB) {
            return -1;
            }
            if (nameA > nameB) {
            return 1;
            }
            return 0;
            }).map(media => new MediaFactory(media))
    }
}
