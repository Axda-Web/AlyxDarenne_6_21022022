import apiManager from '../models/apiManager.js'
import { showLightbox, closeLightbox, prevMedia, nextMedia, lightboxKeyboardNav, closeBtnLightbox, nextBtnLightbox, prevBtnLightbox } from '../utils/lightbox.js'
import { displayContactFormModal, closeContactFormModal, formSubmit, contactFormKeyboardNav } from '../utils/contact.js'
import { displayPhotogapherMedia, displayPhotographerHeader, displayFixedBottomBlock } from '../utils/displayData.js'


//Récupérer l'ID du photographe selectionné via l'URL
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const photographerId = urlParams.get('photographerid')



//Incrémentation via le like button
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
const popularityFilterElt = document.querySelector('.filter--popularity')
const dateFilterElt = document.querySelector('.filter--date')
const titleFilterElt = document.querySelector('.filter--title')

popularityFilterElt.style.display = 'none'


//Fermeture menu-déroulant filtres
function closeFilterList() {

  const iconBtnToggle = document.querySelector('.btn-toggle__icon');

  //Accessibilité
  btnToggleFilters.setAttribute('aria-expanded', 'false')

  filterList.style.display = "none";
  btnToggleFilters.style.padding = ".4em 0";
  btnToggleFilters.style.borderBottom = "none";
  iconBtnToggle.classList.remove('fa-angle-up')
  iconBtnToggle.classList.add('fa-angle-down')
}
  
//Affichage menu-déroulant filtres
function showFiltersList() {

  const iconBtnToggle = document.querySelector('.btn-toggle__icon');

  //Accessibilité
  btnToggleFilters.setAttribute('aria-expanded', 'true')

  btnToggleFilters.classList.toggle('show-filters')

  if(btnToggleFilters.classList.contains('show-filters')){
      filterList.style.display = "block";
      btnToggleFilters.style.padding = "0.5em 0 0.8em 0";
      btnToggleFilters.style.borderBottom = "1px solid white";
      iconBtnToggle.classList.remove('fa-angle-down')
      iconBtnToggle.classList.add('fa-angle-up')
  } else {
        closeFilterList()
  }
}
  
  
//Filtrer les medias par Popularité
function filterMediaByPopularity() {
  
  //Actualisation des éléments du menu filtres
  btnToggleFilters.innerHTML = "Popularité <i class='fas fa-angle-down btn-toggle__icon'></i>"
  dateFilterElt.style.display = 'block'
  titleFilterElt.style.display = 'block'
  popularityFilterElt.style.display = 'none'

  //Accessibilité
  popularityFilterElt.setAttribute('aria-selected', 'true')
  dateFilterElt.setAttribute('aria-selected', 'false')
  titleFilterElt.setAttribute('aria-selected', 'false')
  
  //Fermeture du menu filtres
  closeFilterList()
  btnToggleFilters.classList.toggle('show-filters')
  
  displayPhotogapherMedia(apiManager.displayCurrentPhotographerMediaFilteredByPopularity())
  
  //Reset de l'event like button
  const likesBtn = document.querySelectorAll('.likes-btn')
  likesBtn.forEach( btn => btn.addEventListener('click', handleLikeBtnClick))
  
  //Reset de l'event lightbox
  const mediaItems = document.querySelectorAll('.media-item__media-container')
  mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', event => showLightbox(event, apiManager.currentPhotographerMedia)))
}
  
  
//Filtrer les medias par Date
function filterMediaByDate() {
  
  //Actualisation des éléments du menu filtres
  btnToggleFilters.innerHTML = "Date <i style='margin-left:4.3em;' class='fas fa-angle-down btn-toggle__icon'></i>"
  popularityFilterElt.style.display = 'block'
  titleFilterElt.style.display = 'block'
  dateFilterElt.style.display = 'none'

  //Accessibilité
  popularityFilterElt.setAttribute('aria-selected', 'false')
  dateFilterElt.setAttribute('aria-selected', 'true')
  titleFilterElt.setAttribute('aria-selected', 'false')
  
  //Fermeture du menu filtres
  closeFilterList()
  btnToggleFilters.classList.toggle('show-filters')
  
  //Re-render des medias filtrés par Date
  displayPhotogapherMedia(apiManager.displayCurrentPhotographerMediaFilteredByDate())
  
  //Reset de l'event like button
  const likesBtn = document.querySelectorAll('.likes-btn')
  likesBtn.forEach( btn => btn.addEventListener('click', handleLikeBtnClick))
  
  //Reset de l'event lightbox
  const mediaItems = document.querySelectorAll('.media-item__media-container')
  mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', event => showLightbox(event, apiManager.currentPhotographerMedia)))
}
  
  
//Filtrer les medias par Titre
function filterMediaByTitle() {
  
  //Actualisation des éléments du menu filtres
  btnToggleFilters.innerHTML = "Titre <i style='margin-left:4.3em;' class='fas fa-angle-down btn-toggle__icon'></i>"
  dateFilterElt.style.display = 'block'
  popularityFilterElt.style.display = 'block'
  titleFilterElt.style.display = 'none'

  //Accessibilité
  popularityFilterElt.setAttribute('aria-selected', 'false')
  dateFilterElt.setAttribute('aria-selected', 'false')
  titleFilterElt.setAttribute('aria-selected', 'true')
  
  //Fermeture du menu filtres
  closeFilterList()
  btnToggleFilters.classList.toggle('show-filters')
  
  //Re-render des medias filtrés par Titre
  displayPhotogapherMedia(apiManager.displayCurrentPhotographerMediaFilteredByTitle())

  //Reset de l'event like button
  const likesBtn = document.querySelectorAll('.likes-btn')
  likesBtn.forEach( btn => btn.addEventListener('click', handleLikeBtnClick))
  
  //Reset de l'event lightbox
  const mediaItems = document.querySelectorAll('.media-item__media-container')
  mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', event => showLightbox(event, apiManager.currentPhotographerMedia)))
}

/* ----- FILTRES END ----- */




async function  init() {

    //Récupération des data du photographe
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

    
    //Gestion events modal contact form
    const contactBtn = document.getElementById("open-modal-btn")
    contactBtn.addEventListener('click', () => displayContactFormModal(name))

    const closeBtn = document.getElementById("close-btn")
    closeBtn.addEventListener('click', closeContactFormModal)

    const formSubmitBtn = document.getElementById('submit-form')
    formSubmitBtn.addEventListener('click', formSubmit)

    document.body.addEventListener('keydown', contactFormKeyboardNav)


    //Incrémentation like button
    const likesBtn = document.querySelectorAll('.likes-btn')
    likesBtn.forEach( btn => btn.addEventListener('click', handleLikeBtnClick))


    //Gestion events menu déroulant filtres
    btnToggleFilters.addEventListener('click', showFiltersList)
    popularityFilterElt.addEventListener('click', filterMediaByPopularity)
    dateFilterElt.addEventListener('click', filterMediaByDate)
    titleFilterElt.addEventListener('click', filterMediaByTitle)
    
    
    //Gestion events lightbox
    const mediaItems = document.querySelectorAll('.media-item__media-container')
    mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', (event) => showLightbox(event, photographerMedia)))

    closeBtnLightbox.addEventListener('click', closeLightbox)

    nextBtnLightbox.addEventListener('click', nextMedia)

    prevBtnLightbox.addEventListener('click', prevMedia)

    document.body.addEventListener('keydown', lightboxKeyboardNav)
}

init()

