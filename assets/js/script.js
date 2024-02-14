const arrowDown = document.querySelector('.content-slider__arrow-down')
const arrowTop = document.querySelector('.content-slider__arrow-top')
const slides = document.querySelectorAll('.content__photo')
const miniatures = document.querySelectorAll('.content-slider__item')

let currentSlideIndex = 0

function showSlide() {
  slides[currentSlideIndex].classList.add('content__photo--active')
  miniatures[currentSlideIndex].classList.add('content-slider__item--active')
}

function hideSlide() {
  slides[currentSlideIndex].classList.remove('content__photo--active')
  miniatures[currentSlideIndex].classList.remove('content-slider__item--active')
}

function handleMiniatureClick(index) {
  if (index !== currentSlideIndex) {
    hideSlide()
    currentSlideIndex = index
    showSlide()
  }
}

miniatures.forEach((miniature, index) => {
  miniature.addEventListener('click', () => handleMiniatureClick(index))
})

function nextSlide() {
  hideSlide()
  currentSlideIndex = (currentSlideIndex + 1) % slides.length
  showSlide()
}

function previousSlide() {
  hideSlide()
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length
  showSlide()
}

arrowDown.addEventListener('click', nextSlide)
arrowTop.addEventListener('click', previousSlide)

document.addEventListener('DOMContentLoaded', () => {
  initBurgerMenu()
  initCountUpAnimation()
})

function initBurgerMenu() {
  const burger = document.querySelector('.header__burger')
  const menu = document.querySelector('.header-menu')
  const headerRight = document.querySelector('.header__right')

  burger.addEventListener('click', () => {
    burger.classList.toggle('header__burger--active')
    menu.classList.toggle('header-menu--active')
    headerRight.classList.toggle('header__right--active')
  })
}

function initCountUpAnimation() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numbers = document.querySelectorAll('.achievements__number')
        numbers.forEach(num => animateNumber(num, parseInt(num.textContent)))
        observer.disconnect()
      }
    })
  }, {
    threshold: 0.5
  })

  const achievementsSection = document.querySelector('.achievements')
  observer.observe(achievementsSection)
}

function animateNumber(element, target) {
  let start = 0
  const duration = 1000
  let stepTime = duration / target

  const interval = setInterval(() => {
    start += 1
    element.textContent = `${start} +`

    if (start >= target) {
      clearInterval(interval)
      element.textContent = `${target} +`
    }
  }, stepTime)
}