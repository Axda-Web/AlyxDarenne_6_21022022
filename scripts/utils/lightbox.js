import MediaFactory from '../factories/MediaFactory.js'

//Initialisation des variables
export const mediaItems = document.querySelectorAll('.media-item__media-container')
export const lightbox = document.querySelector('.lightbox')
export const mediaContainer = document.querySelector('.media-container')
export let currentMediaIndex = 0
export let currentMedia = {}
export let arrMedia = []

export const closeBtnLightbox = document.querySelector('.lightbox__btn--close')
export const nextBtnLightbox = document.querySelector('.lightbox__btn--next')
export const prevBtnLightbox = document.querySelector('.lightbox__btn--prev')



//Apparition de la lightbox
export function showLightbox(event, currentPhotographerMedia) {

    arrMedia = [...currentPhotographerMedia]
    currentMediaIndex = currentPhotographerMedia.findIndex(media => media.id == event.currentTarget.dataset.id)
    currentMedia = currentPhotographerMedia[currentMediaIndex]
    const media = new MediaFactory(currentMedia)
    
    lightbox.style.display = "block"
    mediaContainer.innerHTML = media.getLightbox()
}


//Fermeture LightBox
export function closeLightbox() {
    lightbox.style.display = "none"
}


//Afficher le media suivant
export function nextMedia() {

    currentMediaIndex < arrMedia.length - 1 ? currentMedia = arrMedia[++currentMediaIndex] : currentMediaIndex = 0; currentMedia = arrMedia[currentMediaIndex] 
    const media = new MediaFactory(currentMedia)

    mediaContainer.innerHTML = media.getLightbox()
}


//Afficher le media précédent
export function prevMedia() {
    
    currentMediaIndex > 0 ? currentMedia = arrMedia[--currentMediaIndex] : currentMediaIndex = arrMedia.length - 1; currentMedia = currentMedia = arrMedia[currentMediaIndex]
    const media = new MediaFactory(currentMedia)
    
    mediaContainer.innerHTML = media.getLightbox()
}

