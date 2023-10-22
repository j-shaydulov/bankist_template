const modal = document.querySelector('.modal');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const overlay = document.querySelector('.overlay');

const body = document.body;


function openModal (){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

for(let i = 0; i<btnOpenModal.length; i++){
    btnOpenModal[i].addEventListener('click', openModal);
    btnCloseModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}

const cookie = document.createElement('div');
cookie.classList.add('cookie-message');

body.prepend(cookie);

cookie.innerHTML = `
We use cookied for improved functionality and analytics
<button class="btn btn--close-cookie">Got it</button>`;

cookie.style.backgroundColor = 'black'
cookie.style.padding = '1rem 0'

document.querySelector('.btn--close-cookie').addEventListener('click', ()=> cookie.remove())



