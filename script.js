const nav = document.getElementById("navbar")
nav.addEventListener("click", navClickHandler)

function navClickHandler(event) {
  event.preventDefault()
  const navItem = event.target.parentElement
  if (navItem.classList.contains("navbar__item")) {
    Array.from(nav.querySelectorAll(".navbar__item")).forEach(item => {
      item.classList.remove("navbar__item_active")
    })
    navItem.classList.add("navbar__item_active")
  }
}
