import apiManager from '../models/apiManager.js'
import MediaFactory from '../factories/MediaFactory.js'
import { displayContactFormModal, closeContactFormModal, formSubmit } from '../utils/contact.js'
import { displayPhotogapherMedia, displayPhotographerHeader, displayFixedBottomBlock } from '../utils/displayData.js'


//Récupérer l'ID du photographe selectionné via l'URL
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const photographerId = urlParams.get('photographerid')



//Incrémentation via le like btn
function handleLikeBtnClick(event){
    const clickedMedia = apiManager.getClickedMedia(parseInt(event.target.dataset.id))
    const clickedMediaId = parseInt(event.target.dataset.id)
    apiManager.manageLikesState(clickedMediaId)

    this.parentNode.innerHTML = `${clickedMedia.likes} <i data-id="" class="fas fa-heart likes-btn"></i>`
    document.querySelector('.likes-total').innerHTML = `${apiManager.currentPhotographerTotalLikes} <i class="fas fa-heart"></i>`
}



/* ----- FILTRES ----- */

//Initialisation variables
const btnToggleFilters = document.querySelector(".btn-toggle")
const filterList = document.querySelector(".filters");
const iconBtnToggle = document.querySelector('.btn-toggle__icon');
const popularityFilterElt = document.querySelector('.filter--popularity')
const dateFilterElt = document.querySelector('.filter--date')
const titleFilterElt = document.querySelector('.filter--title')

popularityFilterElt.style.display = 'none'


//Fermeture menu-déroulant filtres
export function closeFilterList() {
    filterList.style.display = "none";
    btnToggleFilters.style.padding = ".4em 0";
    btnToggleFilters.style.borderBottom = "none";
    iconBtnToggle.className = "fas fa-angle-down btn-toggle__icon"
    btnToggleFilters.classList.toggle('show-filters')
  }
  
  //Affichage menu-déroulant filtres
  export function showFiltersList() {
    btnToggleFilters.classList.toggle('show-filters')
      if(btnToggleFilters.classList.contains('show-filters')){
        filterList.style.display = "block";
        btnToggleFilters.style.padding = "0.5em 0 0.8em 0";
        btnToggleFilters.style.borderBottom = "1px solid white";
        iconBtnToggle.className = "fas fa-angle-up btn-toggle__icon"
      } else {
        closeFilterList()
      }
  }
  
  
  //Fonctions permettants de filtrer les medias
  
  export function filterMediaByPopularity() {
  
      btnToggleFilters.innerHTML = "Popularité <i class='fas fa-angle-down btn-toggle__icon'></i>"
      dateFilterElt.style.display = 'block'
      titleFilterElt.style.display = 'block'
      popularityFilterElt.style.display = 'none'
  
      closeFilterList()
  
      displayPhotogapherMedia(apiManager.displayCurrentPhotographerMediaFilteredByPopularity())
  
      const likesBtn = document.querySelectorAll('.likes-btn')
      likesBtn.forEach( btn => btn.addEventListener('click', handleLikeBtnClick))
  
      const mediaItems = document.querySelectorAll('.media-item__media-container')
      mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', event => showLightbox(event, apiManager.currentPhotographerMedia)))
  }
  
  
  export function filterMediaByDate() {
  
      btnToggleFilters.innerHTML = "Date <i style='margin-left:4.3em;' class='fas fa-angle-down btn-toggle__icon'></i>"
      popularityFilterElt.style.display = 'block'
      titleFilterElt.style.display = 'block'
      dateFilterElt.style.display = 'none'
  
      closeFilterList()
  
      displayPhotogapherMedia(apiManager.displayCurrentPhotographerMediaFilteredByDate())
  
      const likesBtn = document.querySelectorAll('.likes-btn')
      likesBtn.forEach( btn => btn.addEventListener('click', handleLikeBtnClick))
  
      const mediaItems = document.querySelectorAll('.media-item__media-container')
      mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', event => showLightbox(event, apiManager.currentPhotographerMedia)))
  }
  
  
  export function filterMediaByTitle() {
  
      btnToggleFilters.innerHTML = "Titre <i style='margin-left:4.3em;' class='fas fa-angle-down btn-toggle__icon'></i>"
      dateFilterElt.style.display = 'block'
      popularityFilterElt.style.display = 'block'
      titleFilterElt.style.display = 'none'
  
      closeFilterList()
  
      displayPhotogapherMedia(apiManager.displayCurrentPhotographerMediaFilteredByTitle())

  
      const likesBtn = document.querySelectorAll('.likes-btn')
      likesBtn.forEach( btn => btn.addEventListener('click', handleLikeBtnClick))
  
      const mediaItems = document.querySelectorAll('.media-item__media-container')
      mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', event => showLightbox(event, apiManager.currentPhotographerMedia)))
  }

/* ----- FILTRES END ----- */




/* ----- LIGHTBOX ----- */

//Initialisation des variables
const lightbox = document.querySelector('.lightbox')
const mediaContainer = document.querySelector('.media-container')
let currentMediaIndex = 0
let currentMedia = {}
let arrMedia = []

const closeBtnLightbox = document.querySelector('.lightbox__btn--close')
const nextBtnLightbox = document.querySelector('.lightbox__btn--next')
const prevBtnLightbox = document.querySelector('.lightbox__btn--prev')



//Apparition de la lightbox
function showLightbox(event, photographerMedia) {

    arrMedia = [...photographerMedia]
    currentMediaIndex = photographerMedia.findIndex(media => media.id == event.currentTarget.dataset.id)
    currentMedia = photographerMedia[currentMediaIndex]
    const media = new MediaFactory(currentMedia)
    
    lightbox.style.display = "block"
    mediaContainer.innerHTML = media.getLightbox()
}


//Fermeture LightBox
export function closeLightbox() {
    lightbox.style.display = "none"
}


//Afficher le media suivant
function nextMedia() {

    currentMediaIndex < arrMedia.length - 1 ? currentMedia = arrMedia[++currentMediaIndex] : currentMediaIndex = 0; currentMedia = arrMedia[currentMediaIndex] 
    const media = new MediaFactory(currentMedia)

    mediaContainer.innerHTML = media.getLightbox()
}


//Afficher le media précédent
function prevMedia() {
    
    currentMediaIndex > 0 ? currentMedia = arrMedia[--currentMediaIndex] : currentMediaIndex = arrMedia.length - 1; currentMedia = currentMedia = arrMedia[currentMediaIndex]
    const media = new MediaFactory(currentMedia)
    
    mediaContainer.innerHTML = media.getLightbox()
}


//Défilement des images avec les touches directionnelles du clavier
function arrowNav(event) {
    if(event.key === "ArrowLeft"){
        prevMedia()
    } else if(event.key === "ArrowRight"){
        nextMedia()
    }
}

/* ----- LIGHTBOX END ----- */




async function  init() {

    //Affichage data photographer + media
    await apiManager.init()
    apiManager.setPhotographersInfo()
    apiManager.setCurrentPhotographerInfo(photographerId)
    apiManager.setCurrentPhotographerMedia(photographerId)
    apiManager.setCurrentPhotographerTotalLikes()

    const photographerInfo = apiManager.currentPhotographerInfo
    const photographerMedia = apiManager.currentPhotographerMedia
    const totalLikes = apiManager.currentPhotographerTotalLikes

    const { price, name } = photographerInfo

    
    //Affichage des data du photographe dans le header
    const currentPhotographerInfo = apiManager.displayCurrentPhotographerInfo()
    displayPhotographerHeader(currentPhotographerInfo)

    //Affichage des medias du photographe sous forme de grille
    const currentPhotographerMedia = apiManager.displayCurrentPhotographerMediaFilteredByPopularity()
    displayPhotogapherMedia(currentPhotographerMedia)

    //Affichage block flottant bas de page contenant la totalité des likes + TJM
    displayFixedBottomBlock(price, totalLikes)

    
    //Gestion du modal contact form
    const contactBtn = document.getElementById("open-modal-btn")
    contactBtn.addEventListener('click', () => displayContactFormModal(name))

    const closeBtn = document.getElementById("close-btn")
    closeBtn.addEventListener('click', closeContactFormModal)

    const formSubmitBtn = document.getElementById('submit-form')
    formSubmitBtn.addEventListener('click', formSubmit)


    //Incrémentation like button
    const likesBtn = document.querySelectorAll('.likes-btn')
    likesBtn.forEach( btn => btn.addEventListener('click', handleLikeBtnClick))


    //Gestion events menu déroulant filtres
    btnToggleFilters.addEventListener('click', showFiltersList)
    popularityFilterElt.addEventListener('click', filterMediaByPopularity)
    dateFilterElt.addEventListener('click', filterMediaByDate)
    titleFilterElt.addEventListener('click', filterMediaByTitle)
    
    
    //Apparition de la lightbox
    const mediaItems = document.querySelectorAll('.media-item__media-container')
    mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', (event) => showLightbox(event, photographerMedia)))

    //Fermeture LightBox
    closeBtnLightbox.addEventListener('click', closeLightbox)

    //Afficher le media suivant
    nextBtnLightbox.addEventListener('click', nextMedia)

    //Afficher le media précédent
    prevBtnLightbox.addEventListener('click', prevMedia)

    document.body.addEventListener('keydown', arrowNav)
}

init()

