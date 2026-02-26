


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

// ----------------------------------------------------------------------------//

// notification toast variables

const notificationToast = document.querySelector('[data-toast]')
const toatsCloseBtn = document.querySelector('[data-toast-close]')

// notification toast eventListener

toatsCloseBtn.addEventListener('click', () => {
    notificationToast.classList.add('closed')
})

// ----------------------------------------------------------------------------//


// mobile menu variables

const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]')
const mobileMenu = document.querySelector('[data-mobile-menu]')
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]')
const overlay = document.querySelector('[data-overlay]')

// mobile menu func

const mobileMenuCloseFunc = () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
};

const mobileMenuOpenFunc = () => {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
}

mobileMenuCloseBtn.forEach(btn => {
    btn.addEventListener('click', mobileMenuCloseFunc)
})

mobileMenuOpenBtn.forEach(btn => {
    btn.addEventListener('click', mobileMenuOpenFunc)
})

// accordion variables

const accordionBtn = document.querySelectorAll('[data-accordion-btn]')
const accordion = document.querySelectorAll('[data-accordion]')
console.log(accordionBtn, accordion);

accordionBtn.forEach(btn => {
    btn.addEventListener('click', function () {

        const subMenu = this.nextElementSibling

        const isClosed = !this.classList.contains('active')
        console.log(this);
        accordionBtn.forEach(otherBtn => {
            otherBtn.classList.remove('active')
            otherBtn.nextElementSibling.classList.remove('active')
        })

        if (isClosed) {
            subMenu.classList.add('active')
            this.classList.add('active')
        }

    })
})


// ----------------------------------------------------------------------------//

// fake Api

async function pobierzBaze() {

    try {
        const response = await fetch('./db.json');
        const result = await response.json();
    } catch (error) {
        console.error(error);
    }
}
pobierzBaze();

