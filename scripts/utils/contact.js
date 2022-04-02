/* ----- CONTACT FORM ----- */


//Initialisation des variables
const mainContainer = document.getElementById('main-container')
const modal = document.getElementById('contact_modal')
const contactBtn = document.getElementById('open-modal-btn')
const modalPhotographerName = document.querySelector('.photographer-name')

const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const email = document.getElementById('email')
const message = document.getElementById('message')
const form = document.getElementById('form')
const inputs = document.querySelectorAll('input:not([type="submit"])')

const modalFormFocusableElements = '#close-btn, #firstname, #lastname, #email, #message, #submit-form'
const modalFormFocusableContent = modal.querySelectorAll(modalFormFocusableElements)
const modalFormFirstFocusableElement = modalFormFocusableContent[0]
const modalFormLastFocusableElement = modalFormFocusableContent[modalFormFocusableContent.length - 1]


//Apparition du formulaire
function displayContactFormModal(name) {
	modal.style.display = 'block'
    modal.focus()
    modal.setAttribute('aria-hidden', 'false')
    document.body.style.overflowY = 'hidden'

    //Accessibilité
    mainContainer.setAttribute('aria-hidden', 'true')

    modalPhotographerName.innerText = name
}


//Fermeture du formulaire
function closeContactFormModal() {

    //Accessibilité
    modal.setAttribute('aria-hidden', 'true')
    mainContainer.setAttribute('aria-hidden', 'false')

    modal.style.display = 'none'
    document.body.style.overflowY = 'scroll'
    inputs.forEach(input => input.classList.remove('validation'))
    message.classList.remove('validation')
    form.reset()
    mainContainer.focus()
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

        modal.style.display = 'none'
        document.body.style.overflowY = 'scroll'
        inputs.forEach(input => input.classList.remove('validation'))
        message.classList.remove('validation')
        form.reset()
        mainContainer.focus()
        
    } else {
        inputs.forEach(input => input.classList.add('validation'))
        message.classList.add('validation')
    }
}


//Gestion navigation formulaire via le clavier
function contactFormKeyboardNav(event) {
    
    if(modal.getAttribute('aria-hidden') === 'false'){

        //Touche Echap
        if(event.key === 'Escape'){
            closeContactFormModal()
            return
        }

        //Touches Tab + ShiftTab
        let isTabPressed = event.key === 'Tab' || event.keyCode === 9;

        if (!isTabPressed) {
            return
        }

        if (event.shiftKey) {
            if (document.activeElement === modalFormFirstFocusableElement) {
                modalFormLastFocusableElement.focus()
                event.preventDefault()
            }
        } else {
            if (document.activeElement === modalFormLastFocusableElement) {
                modalFormFirstFocusableElement.focus()
                event.preventDefault()
            }
        } 
    } 
}

export { displayContactFormModal, closeContactFormModal, formSubmit, contactFormKeyboardNav }

/* ----- CONTACT FORM END ----- */
