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

    //Récuperation des data dans le fichier json
    static async init(){
        let jsonData = await fetch('/data/photographers.json')
        this.data = await jsonData.json()
    }

    //Récupération des info de tous les photographes
    static setPhotographersInfo(){
        this.photographersInfo = this.data.photographers.map(photographer => photographer)
    }
    
    //Récupération des info du photographe selectionné
    static setCurrentPhotographerInfo(id){
        this.currentPhotographerInfo = this.photographersInfo.find(item => item.id === parseInt(id))
    }

    //Récupération des media du photographe selectionné
    static setCurrentPhotographerMedia(id){
        this.currentPhotographerMedia = this.data.media.filter(item => item.photographerId === parseInt(id)).map(item => ({...item, isClicked: false}))
    }

    //Calcul du nombre total de like du photographe selectionné
    static setCurrentPhotographerTotalLikes(){
        this.currentPhotographerTotalLikes = this.currentPhotographerMedia.map(media => media.likes).reduce((acc, val) => acc + val)
    }

    //Récupération du media clické par l'utilisateur
    static getClickedMedia(id){
        return this.currentPhotographerMedia.find(item => item.id === id)
    }

    //Gestion de l'event click sur le like button
    static manageLikesState(id){
        const selectedMedia = this.getClickedMedia(id)
        if(!selectedMedia.isClicked){
            selectedMedia.isClicked = true
            selectedMedia.likes++
            this.currentPhotographerTotalLikes++
        }
    }

    //Affichage info photographes
    static displayPhotographersInfo() {
        return this.photographersInfo.map(photographer => new Photographer(photographer))
    }

    //Affichage info photographe selectionné
    static displayCurrentPhotographerInfo(){
        return new Photographer(this.currentPhotographerInfo)
    }

    //Affichage des medias filtrés par Popularité
    static displayCurrentPhotographerMediaFilteredByPopularity(){
        return this.currentPhotographerMedia.sort((a, b) => b.likes - a.likes).map(media => new MediaFactory(media))
    }

    //Affichage des medias filtrés par Date
    static displayCurrentPhotographerMediaFilteredByDate(){
        return this.currentPhotographerMedia.sort((a, b) => {
            let dateA = new Date(a.date)
            let dateB = new Date(b.date)
            return dateB - dateA
        }).map(media => new MediaFactory(media))
    }

    //Affichage des medias filtrés par Titre
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
