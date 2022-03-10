import apiManager from '../models/apiManager.js'


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


//Gestion interaction formulaire de contact
const modal = document.getElementById("contact_modal");
const modalPhotographerName = document.querySelector('.photographer-name')

function displayContactFormModal(name) {
	modal.style.display = "block";
    modalPhotographerName.innerText = name;
}

function closeContactFormModal() {
    modal.style.display = "none";
}

function formSubmit(event) {
    const firstname = document.getElementById('firstname')
    const lastname = document.getElementById('lastname')
    const email = document.getElementById('email')
    const message = document.getElementById('message')
    const form = document.getElementById('form')

    event.preventDefault()

    if (form.checkValidity()){
        console.log(`
        Prénom: ${firstname.value},
        Nom: ${lastname.value},
        Email: ${email.value},
        Message: ${message.value}
    `)
    } else {
        console.log('Merci de fournir des données valides.')
    }
    

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


//Fonctions permettants de filtrer les medias
function filterMediaByPopularity(currentPhotographerMedia) {

    currentPhotographerMedia.sort((a, b) => b.likes - a.likes)
    displayPhotogapherMedia(currentPhotographerMedia)
}

function filterMediaByDate(currentPhotographerMedia) {

    currentPhotographerMedia.sort((a, b) => {
        let dateA = new Date(a.date)
        let dateB = new Date(b.date)
        return dateB - dateA
    })

    displayPhotogapherMedia(currentPhotographerMedia)
}

function filterMediaByTitle(currentPhotographerMedia) {

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


    //Gestion events menu déroulant filtres
    btnDropdownToggle.addEventListener('click', showFilters)

    const likesBtn = document.querySelectorAll('.likes-btn')
    likesBtn.forEach( btn => btn.addEventListener('click', handleLikesBtnClick))

    const popularityFilterBtn = document.getElementById('popularity-filter')
    popularityFilterBtn.addEventListener('click', () => filterMediaByPopularity(currentPhotographerMedia))

    const dateFilterBtn = document.getElementById('date-filter')
    dateFilterBtn.addEventListener('click', () => filterMediaByDate(currentPhotographerMedia))

    const titleFilterBtn = document.getElementById('title-filter')
    titleFilterBtn.addEventListener('click', () => filterMediaByTitle(currentPhotographerMedia))
}

init()