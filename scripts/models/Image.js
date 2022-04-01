//Affichage des medias contenant une image
export default class Image {

    constructor(data){
        Object.assign(this, data)
        this.mediaPicture = `/assets/SamplePhotos/${this.photographerId}/${this.image}`
    }

    //Affichage dans la grille media du photographe selectionné
    getMediaCardDOM(){
        return `
        <article class="media-item">
                <button aria-labelledby="media-title" class="media-item__media-container" data-id=${this.id}>
                    <img class="media-item__img media-item_thumbnail" src=${this.mediaPicture} alt="${this.title}" aria-label="Closeup view" />
                </button>
                <div class="media-item__text-container">
                    <p id="media-title" class="media-item__title">${this.title}</p>
                    <p class="media-item__likes">${this.likes} <span data-id=${this.id} class="fas fa-heart likes-btn" aria-label="likes"></span></p>
                </div>
            </article>`
    }

    //Affichage dans la lightbox du photographe selectionné
    getLightbox(){
        return `
            <img class="lightbox__media" src=${this.mediaPicture} alt="${this.title}" />
            <p id="lightbox-title" class="lightbox__title">${this.title}</p>
        `
    }

}