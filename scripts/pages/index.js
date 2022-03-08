    import apiManager from '../models/apiManager.js'
    

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        let photographerContent = "";
        photographers.forEach((photographer) => {
            photographerContent += photographer.getUserCardDOM();
        });

        photographersSection.innerHTML = photographerContent
    };

    async function init() {
        // Récupère les datas des photographes
        await apiManager.init();
        const photographers = apiManager.getPhotographers();
        displayData(photographers);
    };
    
    init();
    