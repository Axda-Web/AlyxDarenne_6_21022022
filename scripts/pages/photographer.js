import apiManager from '../models/apiManager.js'
import { displayContactFormModal, closeContactFormModal, formSubmit } from '../utils/contact.js'
import { showFiltersList, filterMediaByPopularity, filterMediaByDate, filterMediaByTitle, btnToggleFilters, popularityFilterElt, dateFilterElt, titleFilterElt } from '../utils/filters.js'
import { displayPhotogapherMedia, displayPhotographerHeader, displayFixedBottomBlock } from '../utils/displayData.js'
import { handleLikesBtnClick } from '../utils/likeBtn.js'
import { showLightbox, closeLightbox, nextMedia, prevMedia, closeBtnLightbox, nextBtnLightbox, prevBtnLightbox, lightbox } from '../utils/lightbox.js'



//Récupérer l'ID du photographe selectionné via l'URL
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const photographerId = urlParams.get('photographerid')



async function  init() {

    //Affichage data photographer + media
    await apiManager.init()
    
    const currentPhotographerInfo = apiManager.getPhotographerById(photographerId)
    displayPhotographerHeader(currentPhotographerInfo)

    const currentPhotographerMedia = apiManager.getPhotographerMedia(photographerId)
    displayPhotogapherMedia(currentPhotographerMedia)

    
    //Affichage block flottant bas de page contenant la totalité des likes + TJM
    const allLikes = currentPhotographerMedia.map(media => media.likes).reduce((acc, val) => acc + val)
    const { price, name } = currentPhotographerInfo
    displayFixedBottomBlock(price, allLikes)

    
    //Gestion du modal contact form
    const contactBtn = document.getElementById("open-modal-btn")
    contactBtn.addEventListener('click', () => displayContactFormModal(name))

    const closeBtn = document.getElementById("close-btn")
    closeBtn.addEventListener('click', closeContactFormModal)

    const formSubmitBtn = document.getElementById('submit-form')
    formSubmitBtn.addEventListener('click', formSubmit)


    //Incrémentation like button
    const likesBtn = document.querySelectorAll('.likes-btn')
    likesBtn.forEach( btn => btn.addEventListener('click', handleLikesBtnClick))


    //Gestion events menu déroulant filtres
    btnToggleFilters.addEventListener('click', showFiltersList)
    popularityFilterElt.addEventListener('click', () => filterMediaByPopularity(currentPhotographerMedia))
    dateFilterElt.addEventListener('click', () => filterMediaByDate(currentPhotographerMedia))
    titleFilterElt.addEventListener('click', () => filterMediaByTitle(currentPhotographerMedia))
    
    
    //Apparition de la lightbox
    const mediaItems = document.querySelectorAll('.media-item__media-container')
    mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', event => showLightbox(event, currentPhotographerMedia)))

    //Fermeture LightBox
    closeBtnLightbox.addEventListener('click', closeLightbox)

    //Afficher le media suivant
    nextBtnLightbox.addEventListener('click', nextMedia)

    //Afficher le media précédent
    prevBtnLightbox.addEventListener('click', prevMedia)
}

init()

