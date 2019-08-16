  const track = document.querySelector('.carousel__track')
  const slides = Array.from(track.children)
  const rightButton = document.querySelector('.carousel__button--right')
  const leftButton = document.querySelector('.carousel__button--left')
  const navDots = document.querySelector('.carousel__nav')
  const dots = Array.from(navDots.children)


  const slideWidth = slides[0].getBoundingClientRect().width;


//arrange slides to next to each other
/*
  slides[0].style.left = slideWidth * 0 + 'px';
  slides[1].style.left = slideWidth * 1 + 'px';
  slides[2].style.left = slideWidth * 2 + 'px';
*/
// -- create a loop so if more images are added, no need to input more codes
const setSlidePosition = (slides, index) => {
  slides.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, leftButton, rightButton, targetIndex) => {
  if (targetIndex === 0) {
    leftButton.classList.add('is-hidden');
    rightButton.classList.remove('is-hidden'); //want to avoid 'is-hidden' anywhere else but the first button
  } else if (targetIndex === slides.length - 1) {
    leftButton.classList.remove('is-hidden');
    rightButton.classList.add('is-hidden');
  } else {
    leftButton.classList.remove('is-hidden');
    rightButton.classList.remove('is-hidden');
  }
}

//right button moves images right
rightButton.addEventListener('click', e => {
const currentSlide = track.querySelector('.current-slide');
const nextSlide = currentSlide.nextElementSibling;
const currentDot = navDots.querySelector('.current-slide');
const nextDot = currentDot.nextElementSibling;
const nextIndex = slides.findIndex(slide => slide === nextSlide) //findIndex will find the index number of the nextSlide const and use it as a nextIndex

moveToSlide(track, currentSlide, nextSlide);
updateDots(currentDot, nextDot);
hideShowArrows(slides, leftButton, rightButton, nextIndex);
})


//left button moves images left
leftButton.addEventListener('click', e=> {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = navDots.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide) //findIndex will find the index number of the nextSlide const and use it as a nextIndex


  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, leftButton, rightButton, prevIndex);
})


//clicking on the nav dot brings you to that slide
navDots.addEventListener('click', e => {
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = navDots.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, leftButton, rightButton, targetIndex);
})
