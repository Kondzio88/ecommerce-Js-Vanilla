


// modal variables
const modal = document.querySelector('[data-modal]')
const modalCloseBtn = document.querySelector('[data-modal-close]')
const modalCloseOverlay = document.querySelector('[data-modal-overlay]')

// modal function
const modalCloseFunc = () => {
    modal.classList.add('closed')
}

// modale eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc)
modalCloseBtn.addEventListener('click', modalCloseFunc)

// notification toast variables

const notificationToast = document.querySelector('[data-toast]')
const toatsCloseBtn = document.querySelector('[data-toast-close]')

// notification toast eventListener

toatsCloseBtn.addEventListener('click', () => {
    notificationToast.classList.add('closed')
})

// fake Api

async function pobierzBaze() {

    try {
        const response = await fetch('./db.json');
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
pobierzBaze();

