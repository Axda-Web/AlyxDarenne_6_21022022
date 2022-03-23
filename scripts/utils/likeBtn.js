//Incrémentation bouttons like

export function handleLikesBtnClick(event) {
    this.parentNode.innerHTML = `${parseInt(this.parentNode.innerText) + 1} <i class="fas fa-heart likes-btn"></i>`
    document.querySelector('.likes-total').innerHTML = `${parseInt(document.querySelector('.likes-total').innerText) + 1} <i class="fas fa-heart"></i>` 
}