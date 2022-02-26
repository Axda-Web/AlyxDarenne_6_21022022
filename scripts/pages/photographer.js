//Mettre le code JavaScript lié à la page photographer.html


//Récupérer l'ID du photographe selectionné via l'URL
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const photographerId = urlParams.get('photographerid')


const manageCurrentPhotographerData = async () => {

    //Récupérer les données du photographe via son ID
    const jsonData = await fetch('../../data/photographers.json')
    const data = await jsonData.json()
    const currentPhotographerData = data.photographers.find(item => item.id == photographerId)
    const {name, city, country, tagline, price, portrait} = currentPhotographerData

    //Récupérer les données media associées au photographe
    const currentPhotographerMedia = data.media.filter(item => item.photographerId == photographerId)

    //Récupérer le nombre total de like du photograph
    let allLikes = currentPhotographerMedia.map(item => item.likes).reduce((total, value) => total + value)
    
    
    //Mise en page des données du photographe
    const displayHeaderData = () => {

    const imgUrl = `assets/photographers/${portrait}`
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

    const photographImg = document.createElement('img')
    photographImg.src = imgUrl
    photographImg.classList.add('photograph-img')
    photographHeader.appendChild(photographImg)
    }

    displayHeaderData()

    const displayMediaGrid = () => {

        const mediaGridContainer = document.querySelector('.media-grid')
        
        currentPhotographerMedia.map(item => {

            //Vérification du type de media (part 1)
            const mediaPicture = !item.image ? `/assets/SamplePhotos/${item.photographerId}/${item.video}` : `/assets/SamplePhotos/${item.photographerId}/${item.image}`
            const imgElt = `<img class="media-item__img" src=${mediaPicture} alt=${item.title} />`
            const videoElt = `<video class="media-item__video" width="300" height="280" >
                                <source src=${mediaPicture} type="video/mp4">
                                Your browser does not support the video tag.
                            </video>`

            return mediaGridContainer.innerHTML += `
            <article class="media-item">
                <div class="media-item__media-container">
                    ${!item.image ? videoElt : imgElt /* Vérification du type de media (part 2)*/}
                </div>
                <div class="media-item__text-container">
                    <p class="media-item__title">${item.title}</p>
                    <p class="media-item__likes">${item.likes} <i class="fas fa-heart"></i></p>
                </div>
            </article>`
    })
    

    }

    displayMediaGrid()


    const  displayFixedBottomBlock = () => {
        const orangeBlock = document.createElement('aside')
        orangeBlock.classList.add('orange-box')
        orangeBlock.innerHTML = `<p>${allLikes} <i class="fas fa-heart"></i></p>
                                <p>${price}€ / jour</p>`
        document.body.appendChild(orangeBlock)
    }

    displayFixedBottomBlock()

}

manageCurrentPhotographerData()



