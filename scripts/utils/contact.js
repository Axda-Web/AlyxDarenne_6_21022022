//Gestion interaction formulaire de contact
const modal = document.getElementById("contact_modal");
const modalPhotographerName = document.querySelector('.photographer-name')

const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const email = document.getElementById('email')
const message = document.getElementById('message')
const form = document.getElementById('form')
const inputs = document.querySelectorAll('input:not([type="button"])')

function displayContactFormModal(name) {
	modal.style.display = "block";
    modalPhotographerName.innerText = name;
}

function closeContactFormModal() {
    modal.style.display = "none";
    inputs.forEach(input => input.classList.remove('validation'))
    message.classList.remove('validation')
    form.reset()

}

function formSubmit(event) {

    event.preventDefault()

    if (form.checkValidity()){
        console.log(`
        Prénom: ${firstname.value},
        Nom: ${lastname.value},
        Email: ${email.value},
        Message: ${message.value}
    `)
        modal.style.display = "none";
        inputs.forEach(input => input.classList.remove('validation'))
        message.classList.remove('validation')
        form.reset()
    } else {
        inputs.forEach(input => input.classList.add('validation'))
        message.classList.add('validation')
    }
}

export { displayContactFormModal, closeContactFormModal, formSubmit }