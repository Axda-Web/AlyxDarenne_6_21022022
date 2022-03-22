export default class Image {

    constructor(data){
        Object.assign(this, data)
        this.mediaPicture = `/assets/SamplePhotos/${this.photographerId}/${this.video}`
    }

    getMediaCardDOM(){
        return `
        <article class="media-item">
                <div class="media-item__media-container" data-id=${this.id}>
                    <video class="media-item__video media-item_thumbnail" width="300" height="280" >
                        <source src=${this.mediaPicture} type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="media-item__text-container">
                    <p class="media-item__title">${this.title}</p>
                    <p class="media-item__likes">${this.likes} <i class="fas fa-heart likes-btn"></i></p>
                </div>
            </article>`
    }

    getLightbox(){
        return `
            <video class="lightbox__media">
                <source src=${this.mediaPicture} type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <p class="lightbox__title">${this.title}</p>
        `
    }

}