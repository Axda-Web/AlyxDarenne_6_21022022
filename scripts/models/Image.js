export default class Image {

    constructor(data){
        Object.assign(this, data)
        this.mediaPicture = `/assets/SamplePhotos/${this.photographerId}/${this.image}`
    }

    getMediaCardDOM(){
        return `
        <article class="media-item">
                <div class="media-item__media-container">
                    <img class="media-item__img" src=${this.mediaPicture} alt=${this.title} />
                </div>
                <div class="media-item__text-container">
                    <p class="media-item__title">${this.title}</p>
                    <p class="media-item__likes">${this.likes} <i class="fas fa-heart likes-btn"></i></p>
                </div>
            </article>`
    }

}