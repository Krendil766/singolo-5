const NAV = document.getElementById("navbar")

// Подсветка выбранных ссылок в навигации
NAV.addEventListener("click", navClickHandler)

function navClickHandler(event) {
  const navItem = event.target.parentElement
  if (navItem.classList.contains("navbar__item")) {
    Array.from(NAV.querySelectorAll(".navbar__item")).forEach(item => {
      item.classList.remove("navbar__item_active")
    })
    navItem.classList.add("navbar__item_active")
  }
}
//--------------------------------------------

// Подсветка ссылок в навигации во время скролла
window.addEventListener("scroll", onChangeScroll)

function onChangeScroll() {
  if (window.pageYOffset < 655) changeActiveNav(0)
  else if (window.pageYOffset >= 655 && window.pageYOffset < 1155) changeActiveNav(1)
  else if (window.pageYOffset >= 1155 && window.pageYOffset < 2024) changeActiveNav(2)
  else if (window.pageYOffset >= 2024 && window.pageYOffset < 2758 && !isPageEnd()) changeActiveNav(3)
  if (isPageEnd() || window.pageYOffset >= 2758) changeActiveNav(4)
}

function isPageEnd() {
  return window.scrollY >= document.documentElement.offsetHeight - innerHeight
}

function changeActiveNav(i) {
  const navLinks = NAV.querySelectorAll(".navbar__item")
  navLinks.forEach(item => {
    item.classList.remove("navbar__item_active")
  })
  navLinks[i].classList.add("navbar__item_active")
}

//--------------------------------------------

// Стилизация хедера при скролле
const H1 = document.querySelector("h1")

window.addEventListener("scroll", onChangeHeader)

function onChangeHeader() {
  if (window.pageYOffset > 100) {
    H1.classList.add("logo_small")
    NAV.classList.add("navbar_small")
  } else {
    H1.classList.remove("logo_small")
    NAV.classList.remove("navbar_small")
  }
}
//--------------------------------------------

// Нажатие на Home в навигации
const HOME = document.getElementById("home")
HOME.addEventListener("click", scrollTopHandler)

function scrollTopHandler() {
  window.scrollTo({ top, behavior: "smooth" })
}
//--------------------------------------------

// Подсветка выбранного фильтра
const TAGS = document.getElementById("tags")
TAGS.addEventListener("click", tagClickHandler)

function tagClickHandler(event) {
  if (event.target.classList.contains("tags__item")) {
    TAGS.querySelectorAll(".tags__item").forEach(item => {
      item.classList.remove("tags__item_active")
    })
    event.target.classList.add("tags__item_active")
  }
}
//--------------------------------------------

// Перемешивание портфолио
const FILTER_BUTTONS = document.querySelectorAll(".tags__item")

for (let filterButton of FILTER_BUTTONS) {
  filterButton.addEventListener("click", shufflePortfolio)
}

function shufflePortfolio(event) {
  if (event.target.classList.contains("tags__item_active")) return
  const portfolioPhotos = document.getElementById("portfolio__photos")

  let shuffledPortfolioPhotos = document.createElement("div")
  shuffledPortfolioPhotos.className = "portfolio__photos"
  shuffledPortfolioPhotos.id = "portfolio__photos"

  const portfolio = Array.from(portfolioPhotos.querySelectorAll(".project-link"))

  for (let i = portfolio.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    const temp = portfolio[j]
    portfolio[j] = portfolio[i]
    portfolio[i] = temp
  }
  for (let item of portfolio) {
    shuffledPortfolioPhotos.append(item)
  }

  portfolioPhotos.replaceWith(shuffledPortfolioPhotos)
}
//--------------------------------------------

// Взаимодействие с картинками в портфолио
const projectLinks = document.querySelectorAll(".project-link")
for (let link of projectLinks) {
  link.addEventListener("click", portfolioClickHandler)
}

function portfolioClickHandler(event) {
  event.preventDefault()

  const projectLink = event.target.parentNode
  if (projectLink.classList.contains("project-link")) {
    projectLinks.forEach(item => {
      item.classList.remove("project-link_active")
    })
    projectLink.classList.add("project-link_active")
  }
}

//--------------------------------------------

// Переключение телефонов
const phones = document.querySelectorAll(".phone")
for (let phone of phones) phone.addEventListener("click", togglePhone)

function togglePhone(event) {
  const phone = event.target
  if (phone.classList.contains("iphone")) {
    phone.nextElementSibling.classList.toggle("hide")
  } else if (phone.classList.contains("phone__screen")) phone.classList.toggle("hide")
}
//--------------------------------------------

// Переключение слайдов
const arrowLeft = document.getElementById("arrow-left")
const arrowRight = document.getElementById("arrow-right")
const slides = document.querySelectorAll(".slide")
const slider = document.getElementById("slider")

arrowLeft.addEventListener("click", changeSlideRight)
arrowRight.addEventListener("click", changeSlideLeft)

function changeSlideLeft() {
  changeSlide("left")
}

function changeSlideRight() {
  changeSlide("right")
}

function changeSlide(direction) {
  for (let slide of slides) {
    slide.classList.toggle("slide_hide")
  }
  for (let slide of slides) {
    if (!slide.classList.contains("slide_hide")) {
      changeSlideClass(slide, `slider-${direction}`)
    } else changeSlideClass(slide, `slider-${direction}-gone`)
  }
  slider.classList.toggle("slider_two")
}

function changeSlideClass(el, newClass) {
  el.classList.add(newClass)
  setTimeout(() => {
    el.classList.remove(newClass)
  }, 300)
}
//--------------------------------------------

// Сабмит формы
const form = document.getElementById("form")
form.addEventListener("submit", onSubmitForm)

function onSubmitForm(event) {
  event.preventDefault()
  const subject = document.getElementById("subject")
  const message = document.getElementById("message")
  const newModal = singoloModal({
    subject: subject.value,
    message: message.value
  })

  newModal.open()
  form.reset()
}
//--------------------------------------------

// Модальное окно
function createModal({ subject, message }) {
  const letterTitle = document.createElement("h2")
  letterTitle.classList.add("letter__title")
  letterTitle.textContent = "Письмо отправлено"

  const letterSubject = document.createElement("p")
  letterSubject.classList.add("letter__subject")
  letterSubject.textContent = subject ? `Тема: ${subject}` : "Без темы"

  const letterDescription = document.createElement("p")
  letterDescription.classList.add("letter__description")
  letterDescription.textContent = message ? `Описание: ${message}` : "Без описания"

  const letterButton = document.createElement("button")
  letterButton.classList.add("letter__button")
  letterButton.textContent = "OK"
  letterButton.dataset.close = true

  const letter = document.createElement("div")
  letter.classList.add("letter")

  const modalOverlay = document.createElement("div")
  modalOverlay.classList.add("singolo-modal__overlay")
  modalOverlay.dataset.close = true

  const modal = document.createElement("div")
  modal.classList.add("singolo-modal")

  letter.append(letterTitle)
  letter.append(letterSubject)
  letter.append(letterDescription)
  letter.append(letterButton)
  modalOverlay.append(letter)
  modal.append(modalOverlay)
  document.body.append(modal)

  return modal
}

function singoloModal(options = {}) {
  const modal = createModal(options)

  const singoloModal = {
    open() {
      setTimeout(() => {
        modal.classList.add("singolo-modal_open")
      }, 100)
    },
    close() {
      modal.classList.remove("singolo-modal_open")
      modal.classList.add("singolo-modal_hide")
      setTimeout(() => {
        modal.classList.remove("singolo-modal_hide")
        modal.parentNode.removeChild(modal)
        modal.removeEventListener("click", closeModal)
      }, 400)
    }
  }

  const closeModal = event => {
    event.target.dataset.close ? singoloModal.close() : null
  }
  modal.addEventListener("click", closeModal)

  return singoloModal
}
//--------------------------------------------
