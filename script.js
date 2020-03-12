const NAV = document.getElementById("navbar")

// Подсветка выбранных ссылок в навигации
window.addEventListener("scroll", () => {
  if (window.pageYOffset < 655) changeActiveNav(0)
  else if (window.pageYOffset >= 655 && window.pageYOffset < 1155)
    changeActiveNav(1)
  else if (window.pageYOffset >= 1155 && window.pageYOffset < 2024)
    changeActiveNav(2)
  else if (
    window.pageYOffset >= 2024 &&
    window.pageYOffset < 2758 &&
    !isPageEnd()
  )
    changeActiveNav(3)
  if (isPageEnd() || window.pageYOffset >= 2758) changeActiveNav(4)
})

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
const HEADER = document.querySelector(".header")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    HEADER.style.opacity = "0.7"
    H1.style.margin = "10px 0 4px 40px"
    NAV.style.marginTop = "4px"
    NAV.style.marginBottom = "0"
  } else {
    HEADER.style.opacity = "1"
    H1.style.margin = "34px 0 35px 40px"
    NAV.style.marginTop = "24px"
    NAV.style.marginBottom = "16px"
  }
})
//--------------------------------------------

// Плавная прокрутка скролла
const LINKS = document.querySelectorAll(".navbar__link")

for (let link of LINKS) {
  link.addEventListener("click", event => {
    event.preventDefault()
    const LINK_TO = link.getAttribute("href")
    if (LINK_TO === "#home") window.scrollTo({ top, behavior: "smooth" })
    else
      document.querySelector(LINK_TO).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      })
  })
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

  const portfolio = Array.from(
    portfolioPhotos.querySelectorAll(".project-link")
  )

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

// Сабмит формы
const SUBMIT_BUTTON = document.getElementById("submit-button")
SUBMIT_BUTTON.addEventListener("click", onSubmitForm)

function onSubmitForm(event) {
  const inputName = document.getElementById("name")
  const inputEmail = document.getElementById("email")

  if (inputName.checkValidity() && inputEmail.checkValidity()) {
    event.preventDefault()
  }
}
//--------------------------------------------
