'use strict'

// modal variables
const modal = document.querySelector('[data-modal]')
const modalCloseBtn = document.querySelector('[data-modal-close]')
const modalCloseOverlay = document.querySelector('[data-modal-overlay]')

// modal function
const modalCloseFunc = () => {
    modal.classList.add('closed')
}

// modale eventListener
modalCloseOverlay.addEventListener('click',modalCloseFunc)
modalCloseBtn.addEventListener('click',modalCloseFunc)

// notification toast variables

const notificationToast = document.querySelector('[data-toast]')
const toatsCloseBtn = document.querySelector('[data-toast-close]')

// notification toast eventListener

toatsCloseBtn.addEventListener('click', ()=> {
    notificationToast.classList.add('closed')
})

// fake Api
const KEY = 'http://localhost:3000/clothes'


 async function fetchApi(key){
    const response = await fetch(key)
    const data = await response.json()
   console.log(data);
    for(const item of data){
        console.log(item);

    }
    return data
 }

 fetchApi(KEY)