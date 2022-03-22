//Gestion interaction formulaire de contact
const modal = document.getElementById("contact_modal");
const modalPhotographerName = document.querySelector('.photographer-name')

function displayContactFormModal(name) {
	modal.style.display = "block";
    modalPhotographerName.innerText = name;
}

function closeContactFormModal() {
    modal.style.display = "none";
}

function formSubmit(event) {
    const firstname = document.getElementById('firstname')
    const lastname = document.getElementById('lastname')
    const email = document.getElementById('email')
    const message = document.getElementById('message')
    const form = document.getElementById('form')

    event.preventDefault()

    if (form.checkValidity()){
        console.log(`
        Prénom: ${firstname.value},
        Nom: ${lastname.value},
        Email: ${email.value},
        Message: ${message.value}
    `)
        modal.style.display = "none";
        form.reset()
    } else {
        console.log('Merci de fournir des données valides.')
    }
}

export { displayContactFormModal, closeContactFormModal, formSubmit }