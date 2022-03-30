/* ----- CONTACT FORM ----- */


//Initialisation des variables
const mainContainer = document.getElementById('main-container')
const modal = document.getElementById("contact_modal");
const modalPhotographerName = document.querySelector('.photographer-name')
const closeBtn = document.getElementById("close-btn")

const firstname = document.querySelector('input#firstname')
const lastname = document.querySelector('input#lastname')
const email = document.querySelector('input#email')
const message = document.querySelector('textarea#message')
const form = document.getElementById('form')
const inputs = document.querySelectorAll('input:not([type="submit"])')


//Apparition du formulaire
function displayContactFormModal(name) {
	modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false')
    mainContainer.setAttribute('aria-hidden', 'true')
    modalPhotographerName.innerText = name;
    //closeBtn.focus()
}


//Fermeture du formulaire
function closeContactFormModal() {

    //Accessibilité
    modal.setAttribute('aria-hidden', 'true')
    mainContainer.setAttribute('aria-hidden', 'false')

    modal.style.display = "none";
    inputs.forEach(input => input.classList.remove('validation'))
    message.classList.remove('validation')
    form.reset()

}


//Envoi du formulaire
function formSubmit(event) {

    event.preventDefault()

    if (form.reportValidity()){
        console.log(`
        Prénom: ${firstname.value},
        Nom: ${lastname.value},
        Email: ${email.value},
        Message: ${message.value}
    `)

        //Accessibilité
        modal.setAttribute('aria-hidden', 'true')
        mainContainer.setAttribute('aria-hidden', 'false')

        modal.style.display = "none";
        inputs.forEach(input => input.classList.remove('validation'))
        message.classList.remove('validation')
        form.reset()
    } else {
        inputs.forEach(input => input.classList.add('validation'))
        message.classList.add('validation')
    }
}


//Gestion navigation formulaire via le clavier
function contactFormKeyboardNav(event) {
    if(modal.getAttribute('aria-hidden') === 'false'){
        switch(event.key) {
            case 'Escape':
                closeContactFormModal()
        }   
    }
}

export { displayContactFormModal, closeContactFormModal, formSubmit, contactFormKeyboardNav }

/* ----- CONTACT FORM END ----- */
