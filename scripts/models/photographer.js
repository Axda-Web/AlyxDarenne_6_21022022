//Affichage info photographe
export default class Photographer {

    constructor(data){
        Object.assign(this, data)
        this.picture = `assets/photographers/${this.portrait}`
    }

    //Affichage dans la grille photographes de la page index.html
    getUserCardDOM(){
        return `<article>
                    <a aria-labelledby="photograph-name" href="../../photographer.html?photographerid=${this.id}">
                        <div class="img-container">
                            <img src=${this.picture} alt="${this.name}">
                        </div>    
                        <h2 id="photograph-name">${this.name}</h2>
                    </a>
                    <p>
                        <span class="text_location">${this.city}, ${this.country}</span></br>
                        <span class="text_tagline">${this.tagline}</span></br>
                        <span class="text_price">${this.price}€/jour</span>
                    </p>
                </article>`;
    }

    //Affichage dans le header de la page photographer.html
    getUserHeader(){
        return `<div class="photograph-description">
                    <h1 class="photograph-name">${this.name}</h1>
                    <p class="photograph-location">${this.city}, ${this.country}</p>
                    <p class="photograph-tagline">${this.tagline}</p>
                </div>
                <button aria-label="Contact Me" class="contact_button" id="open-modal-btn">Contactez-moi</button>
                <img class="photograph-img" src=${this.picture} alt="${this.name}"  />`
    }
}