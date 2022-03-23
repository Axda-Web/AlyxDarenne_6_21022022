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
export function  displayFixedBottomBlock(allLikes, price) {
    
    const orangeBlock = document.createElement('aside')
    orangeBlock.classList.add('orange-box')
    orangeBlock.innerHTML = `<p class="likes-total">${allLikes} <i class="fas fa-heart"></i></p>
                            <p>${price}€ / jour</p>`
    document.body.appendChild(orangeBlock)
}