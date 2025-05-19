"use strict";
console.log("Holi Yanelis estoy comprobando que está conectado el js");
const url = "https://fakestoreapi.com/products";

const productContainer = document.querySelector(".js-product-container"); //url de la api
const searchButton = document.querySelector(".js-search-button"); //botón search de arriba
const cartContainer = document.querySelector(".js-cart-container");

let products = []; //array para los productos
let cart = []; // array vacío para el carrito

function renderProducts(products) {
  for (let product of products) {
    const card = document.createElement("div"); // crea un div
    card.classList.add("card"); // le da una clase
    card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="card-img">
            <p>${product.title}</p>
            <div class="button-container">
            <p class="price">${product.price}€</p>
            <button class="js-add-to-cart" data-id="${product.id}">Añadir al carrito</button></div>            
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
  const productId = parseInt(button.dataset.id);
  const selectedProduct = products.find((product) => product.id === productId);

  // Si ya está en el carrito, lo quitamos
  const cartProduct = cart.findIndex((item) => item.id === productId);
  //-1 implica que no existe porque no existe ese número en el array, si el producto no está en el array, lo añade y si está, no hace nada
  if (cartProduct === -1) {
    cart.push(selectedProduct);
    button.textContent = "Añadido";
    button.classList.add("selected");
  }

  renderCart();
  //añadir el local storage
  localStorage.setItem("cart", JSON.stringify(cart));
  // MARINA HAZ ESTO MAÑANA JODER ^^^^^^^^^^^^
};

function renderCart() {
  cartContainer.innerHTML = "";

  for (let cartProduct of cart) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${cartProduct.image}" alt="${cartProduct.title}" class="remove-card-img">
      <p>${cartProduct.title}</p>
      <p class="price">${cartProduct.price}€</p>
      <button class="js-remove-from-cart" data-id="${cartProduct.id}">Eliminar</button>
    `;
    cartContainer.appendChild(card);
  }

  const removeCartProducts = document.querySelectorAll(".js-remove-from-cart");
  removeCartProducts.forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = parseInt(event.currentTarget.dataset.id);
      // Eliminar del carrito se queda con los id que no son iguales al id del producto que se quiere eliminar
      cart = cart.filter((item) => item.id !== id);

      // Actualizar el botón principal en la lista de productos
      // Este selector busca
      const selectedCartButton = document.querySelector(
        `.js-add-to-cart[data-id="${id}"]`
      );
      if (selectedCartButton) {
        selectedCartButton.textContent = "Añadir al carrito";
        selectedCartButton.classList.remove("selected");
      }

      // Volver a renderizar el carrito
      renderCart();
    });
  });
}

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
