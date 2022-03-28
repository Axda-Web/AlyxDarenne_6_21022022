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
        await apiManager.init();
        apiManager.setPhotographersInfo()
        const photographers = apiManager.displayPhotographersInfo();
        displayData(photographers);
    };
    
    init();
    