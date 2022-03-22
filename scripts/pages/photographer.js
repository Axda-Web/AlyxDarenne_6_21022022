import apiManager from '../models/apiManager.js'
import MediaFactory from '../factories/MediaFactory.js'
import { displayContactFormModal, closeContactFormModal, formSubmit } from '../utils/contact.js'


//Récupérer l'ID du photographe selectionné via l'URL
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const photographerId = urlParams.get('photographerid')



//Affichage photographe header   
function displayPhotographerHeader(currentPhotographerInfo) {
    const photographHeaderElt = document.querySelector('.photograph-header')
    photographHeaderElt.innerHTML = currentPhotographerInfo.getUserHeader()
}


//Affichage grille media
function displayPhotogapherMedia(currentPhotographerMedia) {
        const mediaGridElt = document.querySelector('.media-grid')
        let mediaGridContent = ''

        currentPhotographerMedia.forEach(media => {
            return mediaGridContent += media.getMediaCardDOM()
        })

        mediaGridElt.innerHTML = mediaGridContent
}


//Affichage élément flottant bas de page(nb likes + TJM)
function  displayFixedBottomBlock(allLikes, price) {
    
    const orangeBlock = document.createElement('aside')
    orangeBlock.classList.add('orange-box')
    orangeBlock.innerHTML = `<p class="likes-total">${allLikes} <i class="fas fa-heart"></i></p>
                            <p>${price}€ / jour</p>`
    document.body.appendChild(orangeBlock)
}



//Incrémentation bouttons like
function handleLikesBtnClick(event) {
    this.parentNode.innerHTML = `${parseInt(this.parentNode.innerText) + 1} <i class="fas fa-heart likes-btn"></i>`
    document.querySelector('.likes-total').innerHTML = `${parseInt(document.querySelector('.likes-total').innerText) + 1} <i class="fas fa-heart"></i>` 
}


//Affichage menu-déroulant filtres
const btnToggleFilters = document.querySelector(".btn-toggle")
const filterList = document.querySelector(".filters");
const iconBtnToggle = document.querySelector('.btn-toggle__icon');
const popularityFilterElt = document.querySelector('.filter--popularity')
const dateFilterElt = document.querySelector('.filter--date')
const titleFilterElt = document.querySelector('.filter--title')

function showFiltersList() {
  btnToggleFilters.classList.toggle('show-filters')
    if(btnToggleFilters.classList.contains('show-filters')){
      filterList.style.display = "block";
      btnToggleFilters.style.padding = "0.5em 0 0.8em 0";
      btnToggleFilters.style.borderBottom = "1px solid white";
      iconBtnToggle.className = "fas fa-angle-up btn-toggle__icon"
    } else {
      filterList.style.display = "none";
      btnToggleFilters.style.padding = ".4em 0";
      btnToggleFilters.style.borderBottom = "none";
      iconBtnToggle.className = "fas fa-angle-down btn-toggle__icon"
    }
}


//Fonctions permettants de filtrer les medias
function filterMediaByPopularity(currentPhotographerMedia) {

    btnToggleFilters.innerHTML = "Popularité <i class='fas fa-angle-down btn-toggle__icon'></i>"
    showFiltersList()

    currentPhotographerMedia.sort((a, b) => b.likes - a.likes)
    displayPhotogapherMedia(currentPhotographerMedia)
    const likesBtn = document.querySelectorAll('.likes-btn')
    likesBtn.forEach( btn => btn.addEventListener('click', handleLikesBtnClick))
}

function filterMediaByDate(currentPhotographerMedia) {

    btnToggleFilters.innerHTML = "Date <i style='margin-left:4.3em;' class='fas fa-angle-down btn-toggle__icon'></i>"
    showFiltersList()

    currentPhotographerMedia.sort((a, b) => {
        let dateA = new Date(a.date)
        let dateB = new Date(b.date)
        return dateB - dateA
    })

    displayPhotogapherMedia(currentPhotographerMedia)
    const likesBtn = document.querySelectorAll('.likes-btn')
    likesBtn.forEach( btn => btn.addEventListener('click', handleLikesBtnClick))
}

function filterMediaByTitle(currentPhotographerMedia) {

    btnToggleFilters.innerHTML = "Titre <i style='margin-left:4.3em;' class='fas fa-angle-down btn-toggle__icon'></i>"
    showFiltersList()

    currentPhotographerMedia.sort((a, b) => {
    let nameA = a.title.toLowerCase()
    let nameB = b.title.toLowerCase()

    if (nameA < nameB) {
    return -1;
    }
    if (nameA > nameB) {
    return 1;
    }
    return 0;
    })

    displayPhotogapherMedia(currentPhotographerMedia)
    const likesBtn = document.querySelectorAll('.likes-btn')
    likesBtn.forEach( btn => btn.addEventListener('click', handleLikesBtnClick))
}


async function  init() {

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

    
    
    //Gestion lightbox
    const mediaItems = document.querySelectorAll('.media-item__media-container')
    const lightbox = document.querySelector('.lightbox')
    const mediaContainer = document.querySelector('.media-container')
    let currentMediaIndex = 0
    let currentMedia = {}
    let mediaSrc
    

    //Apparition de la lightbox
    function showLightbox(event) {

        currentMediaIndex = currentPhotographerMedia.findIndex(media => media.id == event.currentTarget.dataset.id)
        currentMedia = currentPhotographerMedia[currentMediaIndex]
        const media = new MediaFactory(currentMedia)
        
        lightbox.style.display = "block"
        mediaContainer.innerHTML = media.getLightbox()
    }
    mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', showLightbox))


    //Fermeture LightBox
    const closeBtnLightbox = document.querySelector('.lightbox__btn--close')
    closeBtnLightbox.addEventListener('click', closeLightbox)

    function closeLightbox() {
        lightbox.style.display = "none"
    }

    
    //Afficher le media suivant
    const nextBtnLightbox = document.querySelector('.lightbox__btn--next')
    nextBtnLightbox.addEventListener('click', nextMedia)

    function nextMedia() {

        currentMediaIndex < currentPhotographerMedia.length - 1 ? currentMedia = currentPhotographerMedia[++currentMediaIndex] : currentMediaIndex = 0; currentMedia = currentPhotographerMedia[currentMediaIndex] 
        const media = new MediaFactory(currentMedia)

        mediaContainer.innerHTML = media.getLightbox()
    }


    //Afficher le media précédent
    const prevBtnLightbox = document.querySelector('.lightbox__btn--prev')
    prevBtnLightbox.addEventListener('click', prevMedia)

    function prevMedia() {
        
        currentMediaIndex > 0 ? currentMedia = currentPhotographerMedia[--currentMediaIndex] : currentMediaIndex = currentPhotographerMedia.length - 1; currentMedia = currentMedia = currentPhotographerMedia[currentMediaIndex]
        const media = new MediaFactory(currentMedia)
        
        mediaContainer.innerHTML = media.getLightbox()
    }
    

}

init()

