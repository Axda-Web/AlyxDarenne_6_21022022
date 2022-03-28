export default class Image {

    constructor(data){
        Object.assign(this, data)
        this.mediaPicture = `/assets/SamplePhotos/${this.photographerId}/${this.image}`
    }

    getMediaCardDOM(){
        return `
        <article class="media-item">
                <div class="media-item__media-container" data-id=${this.id}>
                    <img class="media-item__img media-item_thumbnail" src=${this.mediaPicture} alt=${this.title} />
                </div>
                <div class="media-item__text-container">
                    <p class="media-item__title">${this.title}</p>
                    <p class="media-item__likes">${this.likes} <i data-id=${this.id} class="fas fa-heart likes-btn"></i></p>
                </div>
            </article>`
    }

    getLightbox(){
        return `
            <img class="lightbox__media" src=${this.mediaPicture} alt="" />
            <p class="lightbox__title">${this.title}</p>
        `
    }

}