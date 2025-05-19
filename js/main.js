"use strict";
console.log("Holi Yanelis estoy comprobando que está conectado el js");
const url = "https://fakestoreapi.com/products";

const productContainer = document.querySelector(".js-product-container"); //url de la api
const searchButton = document.querySelector(".js-search-button"); //botón search de arriba
const cartContainer = document.querySelector(".js-cart-container");

let products = []; //array para los productos
let cart = []; // array vacío para el carrito

function renderProducts(products) {
  productContainer.innerHTML = ""; // limpiar para evitar duplicados
  for (let product of products) {
    const card = document.createElement("div"); // crea un div
    card.classList.add("card"); // le da una clase
    card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="card-img">
            <p>${product.title}</p>
            <div class="button-container">
            <p class="price">${product.price}€</p>
            <button class="js-add-to-cart">Añadir al carrito</button></div>            
        `; // pinta el contenido del div

    const button = card.querySelector(".js-add-to-cart");
    button.productId = product.id; // asignamos el id como propiedad
    button.addEventListener("click", handleAddToCart);

    productContainer.appendChild(card); // añade el card al contenedor productcontainer
  }
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
  // obtenemos el id desde la propiedad productId
  const productId = button.productId;
  const selectedProduct = products.find((product) => product.id === productId);

  // Si ya está en el carrito, no añadimos
  const cartProduct = cart.findIndex((item) => item.id === productId);
  //-1 implica que no existe, si no está, lo añade
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
      <button class="js-remove-from-cart">Eliminar</button>
    `;

    const removeBtn = card.querySelector(".js-remove-from-cart");
    removeBtn.productId = cartProduct.id; // asignamos propiedad para eliminar
    removeBtn.addEventListener("click", (event) => {
      const id = event.currentTarget.productId;
      // Eliminar del carrito se queda con los id que no son iguales al id del producto que se quiere eliminar
      cart = cart.filter((item) => item.id !== id);

      // Actualizar el botón principal en la lista de productos
      const selectedCartButton = Array.from(
        document.querySelectorAll(".js-add-to-cart")
      ).find((btn) => btn.productId === id);
      if (selectedCartButton) {
        selectedCartButton.textContent = "Añadir al carrito";
        selectedCartButton.classList.remove("selected");
      }

      // Volver a renderizar el carrito
      renderCart();
    });

    cartContainer.appendChild(card);
  }
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
