"use strict";
console.log("Holi Yanelis estoy comprobando que está conectado el js");
const url = "https://fakestoreapi.com/products";

const productContainer = document.querySelector(".js-product-container"); //url de la api
const searchButton = document.querySelector(".js-search-button"); //botón search de arriba
const cartContainer = document.querySelector(".js-cart-container");
const emptyCart = document.querySelector(".js-empty-cart");

let products = []; //array para los productos
let cart = []; // array vacío para el carrito
let savedCart = localStorage.getItem("cart");

function renderProducts(products) {
  for (let product of products) {
    const card = document.createElement("div"); // crea un div
    card.classList.add("card"); // le da una clase
    card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="card-img">
            <p>${product.title}</p>
            <div class="button-container">
            <p class="price">${product.price}€</p>
            <button class="js-add-to-cart" id="${product.id}">Añadir al carrito</button></div>            
        `; // pinta el contenido del div
    productContainer.appendChild(card); // añade el card al contenedor productcontainer
  }

  // le otorga un evento a todos los botones de añadir al carrito
  let addToCartButtons = document.querySelectorAll(".js-add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", handleAddToCart);
  });
}

const handleClick = (event) => {
  event.preventDefault();
  console.log("he hecho click");
  let valueSearch = document.querySelector(".js-search-input").value;
  console.log(valueSearch);
  //filtro de los productos ignorando mayúsculas, lo transforma a minúsculas directamente
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(valueSearch.toLowerCase())
  );
  productContainer.innerHTML = "";
  console.log(filteredProducts);

  renderProducts(filteredProducts);
  //pintamos los productos filtrados
};

// click en el botón de buscar
searchButton.addEventListener("click", handleClick);

const handleAddToCart = (event) => {
  event.preventDefault();
  const button = event.currentTarget;
  //el id del producto lo pasa a un número
  const productId = parseInt(button.id);
  const selectedProduct = products.find((product) => product.id === productId);

  if (!cart.some((product) => product.id === productId)) {
    cart.push(selectedProduct);
    button.textContent = "Quitar del carrito";
    button.classList.add("selected");
  } else {
    let cartProductIndex = cart.find((product) => product.id === productId);
    cart.splice(cartProductIndex, 1);
    button.textContent = "Añadir al carrito";
    button.classList.remove("selected");
  }

  renderCart();
  //añadir el local storage
  localStorage.setItem("cart", JSON.stringify(cart));
};

function renderCart() {
  cartContainer.innerHTML = "";

  for (let cartProduct of cart) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <button class="js-remove-from-cart" id="${cartProduct.id}">X</button>
      <img src="${cartProduct.image}" alt="${cartProduct.title}" class="remove-card-img">
      <p>${cartProduct.title}</p>
      <p class="price">${cartProduct.price}€</p>
    `;
    cartContainer.appendChild(card);
  }

  const removeCartProducts = document.querySelectorAll(".js-remove-from-cart");

  removeCartProducts.forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = parseInt(event.currentTarget.id);
      // Eliminar del carrito se queda con los id que no son iguales al id del producto que se quiere eliminar
      cart = cart.filter((cartProduct) => cartProduct.id !== id);

      // Actualizar el botón principal en la lista de productos
      // Este selector busca los elementoos en el DOM que tengan el id
      const selectedCartButton = document.getElementById(id);

      if (selectedCartButton) {
        selectedCartButton.textContent = "Añadir al carrito";
        selectedCartButton.classList.remove("selected");
      }

      // Volver a renderizar el carrito
      renderCart();
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}

emptyCart.addEventListener("click", (event) => {
  event.preventDefault();
  cart = [];
  cartContainer.innerHTML = ""; 
  localStorage.removeItem("cart");
  const addToCartButtons = document.querySelectorAll(".js-add-to-cart");
  addToCartButtons.forEach((button) => {
    button.textContent = "Añadir al carrito";
    button.classList.remove("selected");
  });
});

fetch(url)
  //convierte a json
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    //transforma los products en data para que los podamos usar
    products = data;
    //pinta los productos
    renderProducts(products);
  });

if (savedCart != null) {
  cart = JSON.parse(savedCart);
  renderCart();
}
