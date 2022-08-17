// using strict mode
"use strict"

const init = () => {
  if (document.URL.includes("cart.html")) {
    // console.log("cart.html");
  } else {
    // console.log("index.html");
    const fragment = document.createDocumentFragment()
    const shop = document.querySelector("#shop")
    const generateItems = (products) => {
      for (const object of products) {
        // object destructuring
        const {id, title, description, price, thumbnail} = object
        // main container
        const container = document.createElement("div")
        container.id = `product-id-${id}`
        container.classList.add("item")
        container.dataset.title = `${title}`
        container.dataset.img = `${thumbnail}`
        container.dataset.price = `${price}`
        // img container
        const img = document.createElement("img")
        img.width = "220"
        img.src = `${thumbnail}`
        img.alt = `${description}`
        // details info
        const info = document.createElement("div")
        info.classList.add("details")
        // title
        const h3 = document.createElement("h3")
        h3.textContent = `${title}`
        // description
        const p = document.createElement("p")
        p.textContent = `${description}`
        // price description
        const buttonsContainer = document.createElement("div")
        buttonsContainer.classList.add("price-quantity")
        // price
        const h2 = document.createElement("h2")
        h2.textContent = `$ ${price}`
        // buttons
        const buttons = document.createElement("div")
        buttons.classList.add("buttons")
        // minus
        const minus = document.createElement("i")
        minus.classList.add("fa-solid", "fa-minus")
        // amount || quantity
        const quantity = document.createElement("div")
        quantity.id = `${id}`
        quantity.classList.add("quantitprice-y")
        quantity.textContent = 0
        // plus
        const plus = document.createElement("i")
        plus.classList.add("fa-solid", "fa-plus")
        // append children
        buttons.append(minus, quantity, plus)
        buttonsContainer.append(h2, buttons)
        info.append(h3, p, buttonsContainer)
        container.append(img, info)
        fragment.appendChild(container)
      }
      shop.appendChild(fragment)
    }
    const requestAPI = async() => {
      const API = "https://dummyjson.com/products"
      const request = new Request(API)
      const fetchAPI = await fetch(request)
      const response = await fetchAPI.json()
      // console.log(response);
      generateItems(response.products)
    }
    window.onload = function() {
      requestAPI()
    }
    // shop addEventListener
    shop.addEventListener("click", (event) => {
      const target = event.target
      if (target.classList.contains("fa-plus")) {
        // console.log("plus");
        const id = target.previousElementSibling.id
        increment(id)
      } else if (target.classList.contains("fa-minus")) {
        // console.log("minus");
        const id = target.nextElementSibling.id
        decrement(id)
      }
    })
    const increment = (id) => {
      +document.getElementById(`${id}`).textContent++
    }
    const decrement = (id) => {
      if (document.getElementById(`${id}`).textContent === "0") {
        return
      } else {
        +document.getElementById(`${id}`).textContent--
      }
    }
  }
}
init()