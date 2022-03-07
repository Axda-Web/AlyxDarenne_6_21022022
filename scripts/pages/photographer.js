import apiManager from '../models/apiManager.js'
import Photographer from '/scripts/models/photographer.js'
import Media from '/scripts/models/media.js'


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
            const mediaObj = new Media(media)
            return mediaGridContent += mediaObj.getMediaCardDOM()
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


//Affichage menu-déroulant filtres
const btnDropdownToggle = document.querySelector('.dropdown-toggle')
const dropdownIcon = document.querySelector('.dropdown-toggle i')
const dropdownItems = document.querySelector(".dropdown-items")


function showFilters() {
    dropdownItems.classList.toggle('show-filters')
    if(dropdownItems.classList.contains('show-filters')){
        btnDropdownToggle.style.borderRadius = "5px 5px 0 0"
        dropdownIcon.className = "fas fa-angle-up"
    } else {
        btnDropdownToggle.style.borderRadius = "5px"
        dropdownIcon.className = "fas fa-angle-down"
    }
}


//Fonctions permettants de filter les medias
function filterMediaByPopularity() {
    currentPhotographerMedia.sort((a, b) => b.likes - a.likes)
}

function filterMediaByDate() {
    currentPhotographerMedia.sort((a, b) => {
        let dateA = new Date(a.date)
        let dateB = new Date(b.date)
        return dateB - dateA
    })
}

function filterMediaByTitle() {
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
}


async function  init() {

    await apiManager.init()
    const data = await apiManager.data

    const currentPhotographerInfo = new Photographer(data.photographers.find(item => item.id == photographerId))
    displayPhotographerHeader(currentPhotographerInfo)

    const currentPhotographerMedia = data.media.filter(item => item.photographerId == photographerId)
    displayPhotogapherMedia(currentPhotographerMedia)

    const allLikes = currentPhotographerMedia.map(media => media.likes).reduce((acc, val) => acc + val)
    const { price } = currentPhotographerInfo
    displayFixedBottomBlock(price, allLikes)

    btnDropdownToggle.addEventListener('click', showFilters)
}

init()















/* 

//Mise en page des données du photographe
    async function displayHeaderData(currentPhotographer) {
        const photographHeader = document.querySelector('.photograph-header')
        photographHeader.innerHTML = currentPhotographer.getUserHeader()
    }


    async function displayMediaGrid(currentPhotographerMedia) {
        const mediaGridContainer = document.querySelector('.media-grid')
        let mediaContent = "";
        currentPhotographerMedia.forEach( media => {
            mediaContent += media.getMediaCardDOM();
        });

        mediaGridContainer.innerHTML = mediaContent
    };

    async function init() {
        // Récupère les datas des photographes
        await apiManager.init();

        const currentPhotographer = await apiManager.getPhotographerById(photographerId);
        displayHeaderData(currentPhotographer);

        const currentPhotographerMedia = await apiManager.getPhotographerMedia(photographerId);
        displayMediaGrid(currentPhotographerMedia)

        

        const  displayFixedBottomBlock = () => {
            const orangeBlock = document.createElement('aside')
            orangeBlock.classList.add('orange-box')
            orangeBlock.innerHTML = `<p>Total Likes <i class="fas fa-heart"></i></p>
                                    <p>${price}€ / jour</p>`
            document.body.appendChild(orangeBlock)
        }
    
        displayFixedBottomBlock()
    };
    
    init(); 

    */




