export default class Media {

    constructor(data){
        Object.assign(this, data)
        this.mediaPicture = !this.image ? `/assets/SamplePhotos/${this.photographerId}/${this.video}` : `/assets/SamplePhotos/${this.photographerId}/${this.image}`
        this.imgElt = `<img class="media-item__img" src=${this.mediaPicture} alt=${this.title} />`
        this.videoElt = `<video class="media-item__video" width="300" height="280" >
                                <source src=${this.mediaPicture} type="video/mp4">
                                Your browser does not support the video tag.
                            </video>`
    }

    getMediaCardDOM(){
        return `
        <article class="media-item">
                <div class="media-item__media-container">
                    ${!this.image ? this.videoElt : this.imgElt /* Vérification du type de media (part 2)*/}
                </div>
                <div class="media-item__text-container">
                    <p class="media-item__title">${this.title}</p>
                    <p class="media-item__likes">${this.likes} <i class="fas fa-heart likes-btn" onclick="(function(event) {console.log(event); })()"></i></p>
                </div>
            </article>`
    }

}