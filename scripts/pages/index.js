    import apiManager from '../models/apiManager.js'

    //Focus sur le contenu principal afin de faciliter la navigation au clavier
    document.body.focus()
    
    //Affichage de la grille de photographes
    async function displayData(photographers) {
        const photographersSection = document.querySelector('.photographer_section')
        let photographerContent = ''
        photographers.forEach((photographer) => {
            photographerContent += photographer.getUserCardDOM()
        })

        photographersSection.innerHTML = photographerContent
    };

    async function init() {

        //Récupération des data
        await apiManager.init()
        apiManager.setPhotographersInfo()

        //Mise en forme + Affichage des data
        const photographers = apiManager.displayPhotographersInfo()
        displayData(photographers)
    };
    
    init()
    