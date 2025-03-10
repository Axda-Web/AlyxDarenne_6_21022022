/* ----- DYNAMIC DOM SECTION RENDERING ----- */

//Affichage photographe header   
export function displayPhotographerHeader(currentPhotographerInfo) {
    const photographHeaderElt = document.querySelector('.photograph-header')
    photographHeaderElt.innerHTML = currentPhotographerInfo.getUserHeader()
}


//Affichage grille media
export function displayPhotogapherMedia(currentPhotographerMedia) {
        const mediaGridElt = document.querySelector('.media-grid')
        let mediaGridContent = ''

        currentPhotographerMedia.forEach(media => {
            return mediaGridContent += media.getMediaCardDOM()
        })

        mediaGridElt.innerHTML = mediaGridContent
}

//Affichage élément flottant bas de page(nb likes + TJM)
export function  displayFixedBottomBlock(price, totalLikes) {
    
    const orangeBlock = document.createElement('aside')
    orangeBlock.classList.add('orange-box')
    orangeBlock.innerHTML = `<p class="likes-total">${totalLikes} <span class="fas fa-heart"></span></p>
                            <p>${price}€ / jour</p>`
    document.body.appendChild(orangeBlock)
}

/* ----- DYNAMIC DOM SECTION RENDERING END ----- */
