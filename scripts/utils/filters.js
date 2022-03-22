//Affichage menu-déroulant filtres
export const btnDropdownToggle = document.querySelector('.dropdown-toggle')
export const dropdownIcon = document.querySelector('.dropdown-toggle i')
export const dropdownItems = document.querySelector(".dropdown-items")


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

export { showFilters, filterMediaByPopularity, filterMediaByDate, filterMediaByTitle }