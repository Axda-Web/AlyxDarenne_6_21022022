import { displayPhotogapherMedia } from '../utils/displayData.js'
import { handleLikesBtnClick } from './likeBtn.js';
import { showLightbox } from './lightbox.js';


//Initialisation variables filter section
export const btnToggleFilters = document.querySelector(".btn-toggle")
export const filterList = document.querySelector(".filters");
export const iconBtnToggle = document.querySelector('.btn-toggle__icon');
export const popularityFilterElt = document.querySelector('.filter--popularity')
export const dateFilterElt = document.querySelector('.filter--date')
export const titleFilterElt = document.querySelector('.filter--title')


//Affichage menu-déroulant filtres
export function showFiltersList() {
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

export function filterMediaByPopularity(currentPhotographerMedia) {

    btnToggleFilters.innerHTML = "Popularité <i class='fas fa-angle-down btn-toggle__icon'></i>"
    showFiltersList()

    currentPhotographerMedia.sort((a, b) => b.likes - a.likes)

    displayPhotogapherMedia(currentPhotographerMedia)

    const likesBtn = document.querySelectorAll('.likes-btn')
    likesBtn.forEach( btn => btn.addEventListener('click', handleLikesBtnClick))

    const mediaItems = document.querySelectorAll('.media-item__media-container')
    mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', event => showLightbox(event, currentPhotographerMedia)))
}


export function filterMediaByDate(currentPhotographerMedia) {

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

    const mediaItems = document.querySelectorAll('.media-item__media-container')
    mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', event => showLightbox(event, currentPhotographerMedia)))
}


export function filterMediaByTitle(currentPhotographerMedia) {

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

    const mediaItems = document.querySelectorAll('.media-item__media-container')
    mediaItems.forEach(mediaItem => mediaItem.addEventListener('click', event => showLightbox(event, currentPhotographerMedia)))
}