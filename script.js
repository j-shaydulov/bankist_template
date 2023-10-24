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


// operations


const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tab_content = document.querySelectorAll('.operations__content');

// tabs.forEach(tab =>{
//   tab.addEventListener('click', ()=>{

//   })
// })

tabsContainer.addEventListener('click', e =>{

  const clicked = e.target.closest('.operations__tab');

  if(!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  console.log(clicked.dataset.tab);

  const activeContent = document.querySelector(`.operations__content--${clicked.dataset.tab}`);


  tab_content.forEach(content =>{
    content.classList.remove('operations__content--active');
  })
  activeContent.classList.add('operations__content--active');
})


// navbar


const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('nav__link')){
    const links = nav.querySelectorAll('.nav__link');

    links.forEach(link =>{
      if(link != e.target) link.style.opacity = 0.5;  
    })

    console.log(links);
  }
});

nav.addEventListener('mouseout', function (e) {
    const links = nav.querySelectorAll('.nav__link');

    links.forEach(link => {
      if (link != e.target) link.style.opacity = 1;
    });

    console.log(links);
});


