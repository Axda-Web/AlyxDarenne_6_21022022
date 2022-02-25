function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const linkContainer = document.createElement('a')
        linkContainer.href = `../../photographer.html?photographerid=${id}`
        const infoText = document.createElement('p')
        infoText.innerHTML = `<span class="text_location">${city}, ${country}</span></br>
                                <span class="text_tagline">${tagline}</span></br>
                                <span class="text_price">${price}€/jour</span>  `
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(linkContainer)
        article.appendChild(infoText)
        linkContainer.appendChild(img);
        linkContainer.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}