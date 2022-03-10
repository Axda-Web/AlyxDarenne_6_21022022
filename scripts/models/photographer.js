export default class Photographer {

    constructor(data){
        Object.assign(this, data)
        this.picture = `assets/photographers/${this.portrait}`;
    }

    getUserCardDOM(){
        return `<article>
                    <a href="../../photographer.html?photographerid=${this.id}">
                        <img src="${this.picture}">
                        <h2>${this.name}</h2>
                    </a>
                    <p>
                        <span class="text_location">${this.city}, ${this.country}</span></br>
                        <span class="text_tagline">${this.tagline}</span></br>
                        <span class="text_price">${this.price}€/jour</span>
                    </p>
                </article>`;
    }

    getUserHeader(){
        return `<div class="photograph-description">
                    <h2 class="photograph-name">${this.name}</h2>
                    <p class="photograph-location">${this.city}, ${this.country}</p>
                    <p class="photograph-tagline">${this.tagline}</p>
                </div>
                <button class="contact_button" id="open-modal-btn">Contactez-moi</button>
                <img class="photograph-img" src="${this.picture}" alt="" />`
    }
}