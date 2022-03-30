import MediaFactory from '../factories/MediaFactory.js'


/* ----- LIGHTBOX ----- */

//Initialisation des variables
const lightbox = document.getElementById('lightbox')
const mainContainer = document.getElementById('main-container')
const mediaContainer = document.querySelector('.media-container')
let currentMediaIndex = 0
let currentMedia = {}
let arrMedia = []

export const closeBtnLightbox = document.querySelector('.lightbox__btn--close')
export const nextBtnLightbox = document.querySelector('.lightbox__btn--next')
export const prevBtnLightbox = document.querySelector('.lightbox__btn--prev')



//Apparition de la lightbox
export function showLightbox(event, photographerMedia) {

    arrMedia = [...photographerMedia]
    currentMediaIndex = photographerMedia.findIndex(media => media.id == event.currentTarget.dataset.id)
    currentMedia = photographerMedia[currentMediaIndex]
    const media = new MediaFactory(currentMedia)

    //Accessibilité
    lightbox.setAttribute('aria-hidden', 'false')
    mainContainer.setAttribute('aria-hidden', 'true')
    
    lightbox.style.display = "block"
    //closeBtnLightbox.focus()
    mediaContainer.innerHTML = media.getLightbox()
}


//Fermeture LightBox
export function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true')
    mainContainer.setAttribute('aria-hidden', 'false')
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


//Gestion navigation lightbox via le clavier
export function lightboxKeyboardNav(event) {
    if(lightbox.getAttribute('aria-hidden') === 'false'){
        switch(event.key) {
            case 'ArrowLeft':
                prevMedia()
                break

            case 'ArrowRight':
                nextMedia()
                break

            case 'Escape':
                closeLightbox()
        }
    }
}

/* ----- LIGHTBOX END ----- */