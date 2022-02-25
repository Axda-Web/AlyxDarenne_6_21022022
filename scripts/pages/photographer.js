//Mettre le code JavaScript lié à la page photographer.html


//Récupérer l'ID du photographe selectionné via l'URL
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const photographerId = urlParams.get('photographerid')


const getCurrentPhotographerData = async () => {

    //Récupérer les données du photographe via son ID
    const jsonData = await fetch('../../data/photographers.json')
    const data = await jsonData.json()
    const currentPhotographerData = data.photographers.find(item => item.id == photographerId)
    const {name, city, country, tagline, price, portrait} = currentPhotographerData
    const imgUrl = `assets/photographers/${portrait}`
    
    
    //Mise en page des données du photographe
    const displayData = () => {

    const photographHeader = document.querySelector('.photograph-header')

    const photographDescription = document.createElement('div')
    photographDescription.classList.add('photograph-description')
    photographHeader.appendChild(photographDescription)

    const photographName = document.createElement('h2')
    photographName.innerText = name
    photographName.classList.add('photograph-name')
    photographDescription.appendChild(photographName)

    const photographLocation = document.createElement('p')
    photographLocation.innerText = `${city}, ${country}`
    photographLocation.classList.add('photograph-location')
    photographDescription.appendChild(photographLocation)

    const photographTagline = document.createElement('p')
    photographTagline.innerText = tagline
    photographTagline.classList.add('photograph-tagline')
    photographDescription.appendChild(photographTagline)

    // const photographPrice = document.createElement('p')
    // photographPrice.innerText = `${price}€/jour`
    // photographPrice.classList.add('photograph-price')
    // photographDescription.appendChild(photographPrice)

    const photographImg = document.createElement('img')
    photographImg.src = imgUrl
    photographImg.classList.add('photograph-img')
    photographHeader.appendChild(photographImg)
    }

    displayData()
}

getCurrentPhotographerData()



