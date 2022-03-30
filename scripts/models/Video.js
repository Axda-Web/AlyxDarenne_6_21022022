//Affichage des medias contenant une video
export default class Image {

    constructor(data){
        Object.assign(this, data)
        this.mediaPicture = `/assets/SamplePhotos/${this.photographerId}/${this.video}`
    }

    //Affichage dans la grille media du photographe selectionné
    getMediaCardDOM(){
        return `
        <article class="media-item">
                <button aria-labelledby="media-title" class="media-item__media-container" data-id=${this.id}>
                    <video class="media-item__video media-item_thumbnail" width="300" height="280" aria-label="Closeup view">
                        <source src=${this.mediaPicture} type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </button>
                <div class="media-item__text-container">
                    <p id="media-title" class="media-item__title">${this.title}</p>
                    <p class="media-item__likes">${this.likes} <i data-id=${this.id} class="fas fa-heart likes-btn" aria-label="likes"></i></p>
                </div>
            </article>`
    }

    //Affichage dans la lightbox du photographe selectionné
    getLightbox(){
        return `
            <video controls class="lightbox__media">
                <source src=${this.mediaPicture} type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <p id="lightbox-title" class="lightbox__title">${this.title}</p>
        `
    }

}