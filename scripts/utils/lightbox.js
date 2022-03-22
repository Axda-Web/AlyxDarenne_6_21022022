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



//Fermeture LightBox
const closeBtnLightbox = document.querySelector('.lightbox__btn--close')


function closeLightbox() {
    lightbox.style.display = "none"
}


//Afficher le media suivant
const nextBtnLightbox = document.querySelector('.lightbox__btn--next')


function nextMedia() {

    currentMediaIndex < currentPhotographerMedia.length - 1 ? currentMedia = currentPhotographerMedia[++currentMediaIndex] : currentMediaIndex = 0; currentMedia = currentPhotographerMedia[currentMediaIndex] 
    const media = new MediaFactory(currentMedia)

    mediaContainer.innerHTML = media.getLightbox()
}


//Afficher le media précédent
const prevBtnLightbox = document.querySelector('.lightbox__btn--prev')


function prevMedia() {
    
    currentMediaIndex > 0 ? currentMedia = currentPhotographerMedia[--currentMediaIndex] : currentMediaIndex = currentPhotographerMedia.length - 1; currentMedia = currentMedia = currentPhotographerMedia[currentMediaIndex]
    const media = new MediaFactory(currentMedia)
    
    mediaContainer.innerHTML = media.getLightbox()
}