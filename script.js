const modal = document.querySelector('.modal');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const overlay = document.querySelector('.overlay');
const overla = document.querySelector('.overla');

const body = document.body;

function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

for (let i = 0; i < btnOpenModal.length; i++) {
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

cookie.style.backgroundColor = 'black';
cookie.style.padding = '1rem 0';

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => cookie.remove());

// hamburger

const btnOpenBar = document.querySelectorAll('.openbar');
const btnCloseBar = document.querySelector('.close_nav');
const Bar = document.querySelector('.navbar');

for (let i = 0; i < btnOpenBar.length; i++) {
  btnOpenBar[i].addEventListener('click', () => {
    Bar.classList.remove('hidden');
    overla.classList.remove('hidden');
  });
}

function closeBar() {
  Bar.classList.add('hidden');
  overla.classList.add('hidden');
}

btnCloseBar.addEventListener('click', closeBar);
overla.addEventListener('click', closeBar);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeBar();
});

// operations

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tab_content = document.querySelectorAll('.operations__content');

// tabs.forEach(tab =>{
//   tab.addEventListener('click', ()=>{

//   })
// })

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  const activeContent = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );

  tab_content.forEach(content => {
    content.classList.remove('operations__content--active');
  });
  activeContent.classList.add('operations__content--active');
});

// navbar

const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const links = nav.querySelectorAll('.nav__link');

    links.forEach(link => {
      if (link != e.target) link.style.opacity = 0.5;
    });
  }
});

nav.addEventListener('mouseout', function (e) {
  const links = nav.querySelectorAll('.nav__link');

  links.forEach(link => {
    if (link != e.target) link.style.opacity = 1;
  });
});

//nav bar sticky

const header = document.querySelector('.header');

function stickyNav(entries) {
  let [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}

let navHeight = nav.getBoundingClientRect().height;

let headerObserverOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

let headerObserver = new IntersectionObserver(stickyNav, headerObserverOption);

headerObserver.observe(header);

//reveal section

const allSections = document.querySelectorAll('.section');

function revealSection(entries, observer) {
  let [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

let sectionObserved = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
  rootMargin: '-20px',
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserved.observe(section);
});

const allLazyImages = document.querySelectorAll('img[data-src]');

const loadLazyImg = function (entries, observe) {
  let [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observe.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadLazyImg, {
  root: null,
  threshold: 0.1,
});

allLazyImages.forEach(img => {
  imgObserver.observe(img);
});

//slider

const slides = document.querySelectorAll('.slide');
const slideBtnRight = document.querySelector('.slider__btn--right');
const slideBtnLeft = document.querySelector('.slider__btn--left');
const dotsContainer = document.querySelector('.dots');


let currentSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach((_, ind) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${ind}"></button>`
    );
  });
};

createDots();

const activeDots = function(currentSlide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`button[data-slide="${currentSlide}"]`)
  .classList.add('dots__dot--active')
}

activeDots(0);

const goToSlide = function (slideInd) {
  slides.forEach((slide, ind) => {
    slide.style.transform = `translateX(${(ind - slideInd) * 100}%)`;
  });
};

goToSlide(0);

const nextSlide = function () {
  if (currentSlide < maxSlide - 1) currentSlide++;
  else currentSlide = 0;

  goToSlide(currentSlide);
  activeDots(currentSlide)
};

const prevSlide = function () {
  if (currentSlide > 0) currentSlide--;
  else currentSlide = maxSlide - 1;

  goToSlide(currentSlide);
  activeDots(currentSlide);
};

slideBtnRight.addEventListener('click', nextSlide);

slideBtnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', e => {
  if (e.key == 'ArrowRight') nextSlide();
  if (e.key == 'ArrowLeft') prevSlide();
});


dotsContainer.addEventListener('click', (e)=>{
  if (e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    goToSlide(slide)
    activeDots(slide);
  }
})


// ... Your existing code ...

let touchStartX = 0;
let touchEndX = 0;

// Function to handle touch start event
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};

// Function to handle touch move event
const handleTouchMove = (e) => {
  touchEndX = e.touches[0].clientX;
};

// Function to handle touch end event and determine the swipe direction
const handleTouchEnd = () => {
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > 50) {
    prevSlide(); // Swipe right, go to the previous slide
  } else if (swipeDistance < -50) {
    nextSlide(); // Swipe left, go to the next slide
  }
};

// Add touch event listeners
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
document.addEventListener('touchend', handleTouchEnd);

// ... The rest of your code ...
