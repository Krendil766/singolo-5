// Подсветка выбранных ссылок в навигации
let nav = document.getElementById("navbar")
nav.addEventListener("click", navClickHandler)

function navClickHandler(event) {
  let navItem = event.target.parentElement
  if (navItem.classList.contains("navbar__item")) {
    nav.querySelectorAll(".navbar__item").forEach(item => {
      item.classList.remove("navbar__item_active")
    })
    navItem.classList.add("navbar__item_active")
  }
}
//--------------------------------------------

// Стилизация хедера при скролле
let h1 = document.querySelector("h1")
let header = document.querySelector(".header")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    header.style.opacity = "0.7"
    h1.style.margin = "10px 0 4px 40px"
    nav.style.marginTop = "4px"
    nav.style.marginBottom = "0"
  } else {
    header.style.opacity = "1"
    h1.style.margin = "34px 0 35px 40px"
    nav.style.marginTop = "24px"
    nav.style.marginBottom = "16px"
  }
})
//--------------------------------------------

// Плавная прокрутка скролла
const LINKS = document.querySelectorAll(".navbar__link")

for (let link of LINKS) {
  link.addEventListener("click", event => {
    event.preventDefault()
    const linkTo = link.getAttribute("href")
    if (linkTo === "#home") window.scrollTo({ top, behavior: "smooth" })
    else
      document
        .querySelector(linkTo)
        .scrollIntoView({ behavior: "smooth", block: "start" })
  })
}
//--------------------------------------------

// Подсветка выбранного фильтра
let tags = document.getElementById("tags")
tags.addEventListener("click", tagClickHandler)

function tagClickHandler(event) {
  let tagItem = event.target
  if (tagItem.classList.contains("tags__item")) {
    tags.querySelectorAll(".tags__item").forEach(item => {
      item.classList.remove("tags__item_active")
    })
    tagItem.classList.add("tags__item_active")
  }
}
//--------------------------------------------

// Перемешивание портфолио
let filterButtons = document.querySelectorAll(".tags__item")

for (let filterButton of filterButtons) {
  filterButton.addEventListener("click", shufflePortfolio)
}

function shufflePortfolio() {
  let portfolioPhotos = document.getElementById("portfolio__photos")

  let portfolio = document.querySelectorAll(".project-link")
  console.log(portfolio)

  for (let i = portfolio.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    // portfolioPhotos.replaceChild(portfolio[j], portfolio[i])
    ;[portfolio[i], portfolio[j]] = [portfolio[j], portfolio[i]]
  }

  console.log(portfolioPhotos)
  portfolioPhotos.replaceWith(...portfolio)
}
//--------------------------------------------
